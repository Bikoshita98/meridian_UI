import { describe, expect, it } from 'vitest';
import { BoardReconciler, applyEventToBoard, guess } from './reconciler';
import type { Board } from './protocol';

function makeBoard(): Board {
  return {
    id: 'b1',
    name: 'Test board',
    columns: [
      { id: 'col-a', boardId: 'b1', name: 'To Do', order: 0 },
      { id: 'col-b', boardId: 'b1', name: 'Done', order: 1 },
    ],
    cards: [
      { id: 'card-1', columnId: 'col-a', title: 'One', order: 0 },
      { id: 'card-2', columnId: 'col-a', title: 'Two', order: 1 },
    ],
  };
}

describe('applyEventToBoard', () => {
  it('applies CARD_MOVED using the full resolved order arrays, not a delta', () => {
    const board = makeBoard();
    const moved = applyEventToBoard(board, {
      kind: 'CARD_MOVED',
      cardId: 'card-1',
      fromColumnId: 'col-a',
      toColumnId: 'col-b',
      orders: { 'col-b': ['card-1'], 'col-a': ['card-2'] },
    });
    expect(moved.cards.find((c) => c.id === 'card-1')).toMatchObject({ columnId: 'col-b', order: 0 });
    expect(moved.cards.find((c) => c.id === 'card-2')).toMatchObject({ columnId: 'col-a', order: 0 });
  });

  it('CARD_UPDATED: an omitted patch field is left alone, `null` clears it, distinct from `undefined`', () => {
    // Regression test for a real bug: `JSON.stringify` drops `undefined`-valued keys entirely, so a
    // patch built with `{ description: undefined }` to mean "clear the description" would arrive at
    // the other end with no `description` key at all — indistinguishable from "don't touch it." Only
    // an explicit `null` survives the wire as "clear this."
    const board: Board = {
      ...makeBoard(),
      cards: [{ id: 'card-1', columnId: 'col-a', title: 'One', description: 'Has a description', order: 0, assigneeId: 'u1' }],
    };

    const untouched = applyEventToBoard(board, { kind: 'CARD_UPDATED', cardId: 'card-1', patch: { title: 'Renamed' } });
    expect(untouched.cards[0]).toMatchObject({ title: 'Renamed', description: 'Has a description', assigneeId: 'u1' });

    const cleared = applyEventToBoard(board, { kind: 'CARD_UPDATED', cardId: 'card-1', patch: { description: null, assigneeId: null } });
    expect(cleared.cards[0].description).toBeUndefined();
    expect(cleared.cards[0].assigneeId).toBeUndefined();
    expect(cleared.cards[0].title).toBe('One');
  });

  it('CARD_UPDATED: sets and clears labelIds/dueDate/coverColor the same way', () => {
    const board: Board = { ...makeBoard(), cards: [{ id: 'card-1', columnId: 'col-a', title: 'One', order: 0 }] };

    const set = applyEventToBoard(board, {
      kind: 'CARD_UPDATED',
      cardId: 'card-1',
      patch: { labelIds: ['bug', 'urgent'], dueDate: '2026-01-02', coverColor: 'info' },
    });
    expect(set.cards[0]).toMatchObject({ labelIds: ['bug', 'urgent'], dueDate: '2026-01-02', coverColor: 'info' });

    // labelIds is always a full replacement array, not a delta — an empty array already means
    // "no labels," no `null` trick needed the way `dueDate`/`coverColor` need one.
    const relabeled = applyEventToBoard(set, { kind: 'CARD_UPDATED', cardId: 'card-1', patch: { labelIds: [] } });
    expect(relabeled.cards[0].labelIds).toEqual([]);
    expect(relabeled.cards[0].dueDate).toBe('2026-01-02');

    const cleared = applyEventToBoard(set, { kind: 'CARD_UPDATED', cardId: 'card-1', patch: { dueDate: null, coverColor: null } });
    expect(cleared.cards[0].dueDate).toBeUndefined();
    expect(cleared.cards[0].coverColor).toBeUndefined();
    expect(cleared.cards[0].labelIds).toEqual(['bug', 'urgent']);
  });

  it('re-indexes the remaining column on CARD_DELETED', () => {
    const board = makeBoard();
    const deleted = applyEventToBoard(board, { kind: 'CARD_DELETED', cardId: 'card-1', columnId: 'col-a', order: ['card-2'] });
    expect(deleted.cards).toHaveLength(1);
    expect(deleted.cards[0]).toMatchObject({ id: 'card-2', order: 0 });
  });
});

describe('BoardReconciler', () => {
  it('applies an optimistic mutation immediately', () => {
    const reconciler = new BoardReconciler();
    reconciler.setInitial(makeBoard(), []);

    const event = guess.moveCard(makeBoard(), 'card-1', 'col-b', 0);
    const state = reconciler.applyOptimistic('evt-1', event);

    expect(state.board!.cards.find((c) => c.id === 'card-1')!.columnId).toBe('col-b');
  });

  it('confirms a pending optimistic mutation by clientEventId, overwriting the guess with server truth', () => {
    const reconciler = new BoardReconciler();
    reconciler.setInitial(makeBoard(), []);

    // Client guesses it'll land at index 0 in col-b.
    reconciler.applyOptimistic('evt-1', guess.moveCard(makeBoard(), 'card-1', 'col-b', 0));
    expect(reconciler.isPending('evt-1')).toBe(true);

    // Server actually resolved it to a different final order (e.g. another card already there).
    const confirmed = reconciler.applyServerEvent('evt-1', {
      kind: 'CARD_MOVED',
      cardId: 'card-1',
      fromColumnId: 'col-a',
      toColumnId: 'col-b',
      orders: { 'col-b': ['other-card', 'card-1'], 'col-a': ['card-2'] },
    });

    expect(reconciler.isPending('evt-1')).toBe(false);
    expect(confirmed.board!.cards.find((c) => c.id === 'card-1')).toMatchObject({ columnId: 'col-b', order: 1 });
  });

  it('snaps a losing client to the server-resolved conflict outcome for a remote event', () => {
    const reconciler = new BoardReconciler();
    reconciler.setInitial(makeBoard(), []);

    // This client optimistically moved card-1 to col-b index 0 under clientEventId 'evt-mine'.
    reconciler.applyOptimistic('evt-mine', guess.moveCard(makeBoard(), 'card-1', 'col-b', 0));

    // But a *different* client's move (clientEventId 'evt-theirs', not ours) reached the server
    // first and put card-2 there instead — our card-1 move hasn't been confirmed yet, and this
    // remote event doesn't touch card-1 at all, so it should apply cleanly alongside our guess.
    const afterRemote = reconciler.applyServerEvent('evt-theirs', {
      kind: 'CARD_MOVED',
      cardId: 'card-2',
      fromColumnId: 'col-a',
      toColumnId: 'col-b',
      orders: { 'col-b': ['card-2'], 'col-a': [] },
    });
    expect(afterRemote.board!.cards.find((c) => c.id === 'card-2')!.columnId).toBe('col-b');

    // Now our own move is confirmed, resolved to land after card-2.
    const final = reconciler.applyServerEvent('evt-mine', {
      kind: 'CARD_MOVED',
      cardId: 'card-1',
      fromColumnId: 'col-a',
      toColumnId: 'col-b',
      orders: { 'col-b': ['card-2', 'card-1'], 'col-a': [] },
    });
    expect(final.board!.cards.find((c) => c.id === 'card-1')).toMatchObject({ columnId: 'col-b', order: 1 });
    expect(final.board!.cards.find((c) => c.id === 'card-2')).toMatchObject({ columnId: 'col-b', order: 0 });
  });

  it('removes the temp-id ghost card once a CARD_CREATED optimistic guess is confirmed', () => {
    const reconciler = new BoardReconciler();
    const board = makeBoard();
    reconciler.setInitial(board, []);

    const optimisticEvent = guess.createCard(board, 'col-a', 'New card', undefined, 'temp-1');
    const afterOptimistic = reconciler.applyOptimistic('evt-create', optimisticEvent);
    expect(afterOptimistic.board!.cards.some((c) => c.id === 'temp-1')).toBe(true);

    const confirmed = reconciler.applyServerEvent('evt-create', {
      kind: 'CARD_CREATED',
      card: { id: 'real-id', columnId: 'col-a', title: 'New card', order: 2 },
    });

    expect(confirmed.board!.cards.some((c) => c.id === 'temp-1')).toBe(false);
    expect(confirmed.board!.cards.some((c) => c.id === 'real-id')).toBe(true);
  });

  it('a full resync via applyBoardState discards any pending optimistic guesses', () => {
    const reconciler = new BoardReconciler();
    reconciler.setInitial(makeBoard(), []);
    reconciler.applyOptimistic('evt-1', guess.moveCard(makeBoard(), 'card-1', 'col-b', 0));
    expect(reconciler.isPending('evt-1')).toBe(true);

    const freshBoard = makeBoard();
    const resynced = reconciler.applyBoardState(freshBoard, []);

    expect(reconciler.isPending('evt-1')).toBe(false);
    expect(resynced.board).toEqual(freshBoard);
  });

  it('tracks presence join/leave', () => {
    const reconciler = new BoardReconciler();
    reconciler.setInitial(makeBoard(), []);
    reconciler.addUser({ id: 'u1', name: 'Alice', colorSeed: 'primary' });
    expect(reconciler.getState().users).toHaveLength(1);
    reconciler.removeUser('u1');
    expect(reconciler.getState().users).toHaveLength(0);
  });
});
