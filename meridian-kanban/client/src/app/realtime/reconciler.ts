import type { Board, Card, MutationEvent, User } from './protocol';

/**
 * The heart of the whole app: applying a `MutationEvent` to a `Board` is a pure "replace with
 * these final, server-resolved values" operation, never a relative delta. That property is what
 * makes reconciliation below correct without needing to keep an "undo the optimistic guess"
 * snapshot around — re-applying the authoritative version of an event a client already guessed at
 * simply overwrites the guess with truth, whatever the guess was.
 */
export function applyEventToBoard(board: Board, event: MutationEvent): Board {
  switch (event.kind) {
    case 'COLUMN_CREATED':
      return { ...board, columns: [...board.columns, event.column] };

    case 'COLUMN_RENAMED':
      return { ...board, columns: board.columns.map((c) => (c.id === event.columnId ? { ...c, name: event.name } : c)) };

    case 'COLUMNS_REORDERED':
      return {
        ...board,
        columns: event.columnOrder.map((id, order) => ({ ...board.columns.find((c) => c.id === id)!, order })),
      };

    case 'CARD_CREATED':
      return { ...board, cards: [...board.cards, event.card] };

    case 'CARD_UPDATED':
      return { ...board, cards: board.cards.map((c) => (c.id === event.cardId ? { ...c, ...event.patch } : c)) };

    case 'CARD_MOVED': {
      const byId = new Map(board.cards.map((c) => [c.id, c]));
      const touched = new Set(Object.values(event.orders).flat());
      const untouched = board.cards.filter((c) => !touched.has(c.id));
      const updated: Card[] = [];
      for (const [columnId, order] of Object.entries(event.orders)) {
        order.forEach((cardId, idx) => updated.push({ ...byId.get(cardId)!, columnId, order: idx }));
      }
      return { ...board, cards: [...untouched, ...updated] };
    }

    case 'CARD_DELETED': {
      const remaining = board.cards.filter((c) => c.id !== event.cardId);
      return {
        ...board,
        cards: remaining.map((c) => {
          if (c.columnId !== event.columnId) return c;
          const idx = event.order.indexOf(c.id);
          return idx === -1 ? c : { ...c, order: idx };
        }),
      };
    }
  }
}

function cardsInColumn(board: Board, columnId: string): Card[] {
  return board.cards.filter((c) => c.columnId === columnId).sort((a, b) => a.order - b.order);
}

/** Locally-guessed events, built with the same ordering algorithm the server uses, so an optimistic
 * apply looks right immediately — then gets overwritten by the server's authoritative version. */
export const guess = {
  createColumn(board: Board, name: string, tempId: string): Extract<MutationEvent, { kind: 'COLUMN_CREATED' }> {
    return { kind: 'COLUMN_CREATED', column: { id: tempId, boardId: board.id, name, order: board.columns.length } };
  },

  createCard(board: Board, columnId: string, title: string, description: string | undefined, tempId: string): Extract<MutationEvent, { kind: 'CARD_CREATED' }> {
    return { kind: 'CARD_CREATED', card: { id: tempId, columnId, title, description, order: cardsInColumn(board, columnId).length } };
  },

  moveCard(board: Board, cardId: string, toColumnId: string, toIndex: number): Extract<MutationEvent, { kind: 'CARD_MOVED' }> {
    const card = board.cards.find((c) => c.id === cardId)!;
    const fromColumnId = card.columnId;
    const fromIds = cardsInColumn(board, fromColumnId)
      .map((c) => c.id)
      .filter((id) => id !== cardId);
    const toIds = fromColumnId === toColumnId ? fromIds : cardsInColumn(board, toColumnId).map((c) => c.id);
    const clamped = Math.max(0, Math.min(toIndex, toIds.length));
    toIds.splice(clamped, 0, cardId);
    const orders: Record<string, string[]> = { [toColumnId]: toIds };
    if (fromColumnId !== toColumnId) orders[fromColumnId] = fromIds;
    return { kind: 'CARD_MOVED', cardId, fromColumnId, toColumnId, orders };
  },

  deleteCard(board: Board, cardId: string): Extract<MutationEvent, { kind: 'CARD_DELETED' }> {
    const card = board.cards.find((c) => c.id === cardId)!;
    const order = cardsInColumn(board, card.columnId)
      .map((c) => c.id)
      .filter((id) => id !== cardId);
    return { kind: 'CARD_DELETED', cardId, columnId: card.columnId, order };
  },
};

export interface ReconcilerState {
  board: Board | null;
  users: User[];
}

/**
 * Pure, transport-agnostic reconciliation state machine — no WebSocket, no Angular, so it's
 * trivially unit-testable. `RealtimeService` is the thin layer that wires this to an actual socket.
 */
export class BoardReconciler {
  private state: ReconcilerState = { board: null, users: [] };
  private readonly pending = new Map<string, { tempEntityId?: string }>();

  getState(): ReconcilerState {
    return this.state;
  }

  setInitial(board: Board, users: User[]): ReconcilerState {
    this.pending.clear();
    this.state = { board, users };
    return this.state;
  }

  applyBoardState(board: Board, users: User[]): ReconcilerState {
    // A full resync always wins over any in-flight optimistic guess — there is no well-defined way
    // to replay pending local intent on top of a snapshot we didn't derive incrementally.
    this.pending.clear();
    this.state = { board, users };
    return this.state;
  }

  /** Apply a local guess immediately, before the server has confirmed it. */
  applyOptimistic(clientEventId: string, event: MutationEvent): ReconcilerState {
    const tempEntityId = event.kind === 'CARD_CREATED' ? event.card.id : event.kind === 'COLUMN_CREATED' ? event.column.id : undefined;
    this.pending.set(clientEventId, { tempEntityId });
    this.state = { ...this.state, board: applyEventToBoard(this.state.board!, event) };
    return this.state;
  }

  /** Apply a server-broadcast EVENT — either confirming our own pending guess or applying a remote change. */
  applyServerEvent(clientEventId: string | undefined, event: MutationEvent): ReconcilerState {
    let board = this.state.board!;

    if (clientEventId && this.pending.has(clientEventId)) {
      const { tempEntityId } = this.pending.get(clientEventId)!;
      this.pending.delete(clientEventId);
      // The optimistic guess used a client-generated temp id for a create; strip that ghost entity
      // before adding the server's real one, or we'd end up with a duplicate.
      if (tempEntityId && event.kind === 'CARD_CREATED') {
        board = { ...board, cards: board.cards.filter((c) => c.id !== tempEntityId) };
      } else if (tempEntityId && event.kind === 'COLUMN_CREATED') {
        board = { ...board, columns: board.columns.filter((c) => c.id !== tempEntityId) };
      }
    }

    this.state = { ...this.state, board: applyEventToBoard(board, event) };
    return this.state;
  }

  addUser(user: User): ReconcilerState {
    if (this.state.users.some((u) => u.id === user.id)) return this.state;
    this.state = { ...this.state, users: [...this.state.users, user] };
    return this.state;
  }

  removeUser(userId: string): ReconcilerState {
    this.state = { ...this.state, users: this.state.users.filter((u) => u.id !== userId) };
    return this.state;
  }

  isPending(clientEventId: string): boolean {
    return this.pending.has(clientEventId);
  }
}
