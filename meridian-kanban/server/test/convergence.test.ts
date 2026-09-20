import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { WebSocket } from 'ws';
import { createKanbanServer, type KanbanServerHandle } from '../src/ws-server.js';
import type { Board, ClientMessage, MutationEvent, ServerMessage } from '../src/protocol.js';

/**
 * The point of this test: two independent WebSocket clients mutate the same board concurrently,
 * and after both have received every broadcast, their *independently derived* local states must be
 * identical to each other and to a fresh server snapshot (SYNC_REQUEST). That's the actual claim
 * BUILD_PROMPT.md's protocol design makes — not just "the server doesn't crash."
 */

class TestClient {
  readonly ws: WebSocket;
  readonly received: ServerMessage[] = [];
  private readonly waiters: { pred: (m: ServerMessage) => boolean; resolve: (m: ServerMessage) => void }[] = [];

  constructor(url: string) {
    this.ws = new WebSocket(url);
    this.ws.on('message', (data) => {
      const msg = JSON.parse(data.toString()) as ServerMessage;
      this.received.push(msg);
      for (let i = this.waiters.length - 1; i >= 0; i--) {
        if (this.waiters[i].pred(msg)) {
          this.waiters[i].resolve(msg);
          this.waiters.splice(i, 1);
        }
      }
    });
  }

  open(): Promise<void> {
    return new Promise((resolve) => this.ws.once('open', () => resolve()));
  }

  send(msg: ClientMessage): void {
    this.ws.send(JSON.stringify(msg));
  }

  waitFor<T extends ServerMessage>(pred: (m: ServerMessage) => m is T, timeoutMs = 2000): Promise<T> {
    const already = this.received.find(pred) as T | undefined;
    if (already) return Promise.resolve(already);
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('timeout waiting for message')), timeoutMs);
      this.waiters.push({
        pred,
        resolve: (m) => {
          clearTimeout(timer);
          resolve(m as T);
        },
      });
    });
  }

  close(): void {
    this.ws.close();
  }
}

/** Mirrors the reconciliation a real client applies to its local board on receiving a broadcast EVENT. */
function applyEvent(board: Board, event: MutationEvent): Board {
  switch (event.kind) {
    case 'COLUMN_CREATED':
      return { ...board, columns: [...board.columns, event.column] };
    case 'CARD_CREATED':
      return { ...board, cards: [...board.cards, event.card] };
    case 'CARD_MOVED': {
      const cards = board.cards.filter((c) => c.id !== event.cardId);
      for (const [columnId, order] of Object.entries(event.orders)) {
        order.forEach((cardId, idx) => {
          if (cardId === event.cardId) {
            const original = board.cards.find((c) => c.id === cardId)!;
            cards.push({ ...original, columnId, order: idx });
          } else {
            const existing = cards.find((c) => c.id === cardId)!;
            existing.columnId = columnId;
            existing.order = idx;
          }
        });
      }
      return { ...board, cards };
    }
    default:
      return board;
  }
}

function isJoined(m: ServerMessage): m is Extract<ServerMessage, { type: 'JOINED' }> {
  return m.type === 'JOINED';
}
function isEvent(m: ServerMessage): m is Extract<ServerMessage, { type: 'EVENT' }> {
  return m.type === 'EVENT';
}
function isBoardState(m: ServerMessage): m is Extract<ServerMessage, { type: 'BOARD_STATE' }> {
  return m.type === 'BOARD_STATE';
}

function sortBoard(board: Board): Board {
  return {
    ...board,
    columns: [...board.columns].sort((a, b) => a.id.localeCompare(b.id)),
    cards: [...board.cards].sort((a, b) => a.id.localeCompare(b.id)),
  };
}

describe('two-client convergence', () => {
  let handle: KanbanServerHandle;
  let url: string;

  beforeAll(async () => {
    handle = await createKanbanServer({ dbPath: ':memory:' });
    url = `ws://localhost:${handle.port}`;
  });

  afterAll(async () => {
    await handle.close();
  });

  it('converges to the same board state after concurrent moves from two clients', async () => {
    const boardId = 'convergence-board';
    const alice = new TestClient(url);
    const bob = new TestClient(url);
    await Promise.all([alice.open(), bob.open()]);

    alice.send({ type: 'JOIN', boardId, userName: 'Alice' });
    const aliceJoined = await alice.waitFor(isJoined);
    bob.send({ type: 'JOIN', boardId, userName: 'Bob' });
    const bobJoined = await bob.waitFor(isJoined);

    let aliceBoard = aliceJoined.board;
    let bobBoard = bobJoined.board;
    expect(aliceBoard.columns).toHaveLength(3);
    const [colA, colB] = aliceBoard.columns;

    // Alice creates a card in column A.
    alice.send({ type: 'CREATE_CARD', clientEventId: 'e-create', columnId: colA.id, title: 'Task A' });
    const createEvent = await bob.waitFor((m): m is Extract<ServerMessage, { type: 'EVENT' }> => isEvent(m) && m.event.kind === 'CARD_CREATED');
    const createEventForAlice = await alice.waitFor(
      (m): m is Extract<ServerMessage, { type: 'EVENT' }> => isEvent(m) && m.event.kind === 'CARD_CREATED',
    );
    aliceBoard = applyEvent(aliceBoard, createEventForAlice.event);
    bobBoard = applyEvent(bobBoard, createEvent.event);
    const cardId = (createEvent.event as Extract<MutationEvent, { kind: 'CARD_CREATED' }>).card.id;

    // Bob moves that same card into column B "concurrently" (without waiting for Alice to do anything else).
    bob.send({ type: 'MOVE_CARD', clientEventId: 'e-move', cardId, toColumnId: colB.id, toIndex: 0 });
    const moveEventForAlice = await alice.waitFor(
      (m): m is Extract<ServerMessage, { type: 'EVENT' }> => isEvent(m) && m.event.kind === 'CARD_MOVED',
    );
    const moveEventForBob = await bob.waitFor(
      (m): m is Extract<ServerMessage, { type: 'EVENT' }> => isEvent(m) && m.event.kind === 'CARD_MOVED',
    );
    aliceBoard = applyEvent(aliceBoard, moveEventForAlice.event);
    bobBoard = applyEvent(bobBoard, moveEventForBob.event);

    // Both clients independently derived their state purely from broadcasts — they must agree.
    expect(sortBoard(aliceBoard)).toEqual(sortBoard(bobBoard));

    // And a fresh server snapshot (what a reconnecting client would resync to) must match both.
    alice.send({ type: 'SYNC_REQUEST' });
    const snapshot = await alice.waitFor(isBoardState);
    expect(sortBoard(snapshot.board)).toEqual(sortBoard(aliceBoard));

    const movedCard = snapshot.board.cards.find((c) => c.id === cardId)!;
    expect(movedCard.columnId).toBe(colB.id);
    expect(movedCard.order).toBe(0);

    alice.close();
    bob.close();
  });
});
