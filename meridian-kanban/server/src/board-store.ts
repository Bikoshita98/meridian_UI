import { randomUUID } from 'node:crypto';
import { createRequire } from 'node:module';
import type { Board, Card, Column, MutationEvent } from './protocol.js';

// `node:sqlite` is a newer builtin that Vite/vitest's ESM resolver doesn't recognize as external
// (it tries to resolve it as an npm package and fails). A runtime `require()` sidesteps that
// resolution pass entirely — this still runs fine under plain Node/tsx, which is the only other
// place this module is ever loaded.
const require = createRequire(import.meta.url);
const { DatabaseSync } = require('node:sqlite') as typeof import('node:sqlite');

/**
 * Internal representation deliberately splits "which cards exist" from "what order are they in"
 * (per-column ordered id arrays) instead of trusting a numeric `order` field round-tripped from the
 * client. This makes every mutation's resulting order a value the server computes and owns outright
 * — there's no float/index drift to reconcile, and the public `Board` snapshot (protocol.ts's stated
 * data model) is simply derived from array position at serialization time.
 */
interface ColumnInternal {
  id: string;
  name: string;
}

interface CardInternal {
  id: string;
  title: string;
  description?: string;
  assigneeId?: string;
}

interface BoardState {
  id: string;
  name: string;
  seq: number;
  columnOrder: string[];
  columns: Map<string, ColumnInternal>;
  cards: Map<string, CardInternal>;
  cardOrderByColumn: Map<string, string[]>;
}

type PersistedShape = {
  id: string;
  name: string;
  seq: number;
  columnOrder: string[];
  columns: [string, ColumnInternal][];
  cards: [string, CardInternal][];
  cardOrderByColumn: [string, string[]][];
};

export type MutationInput =
  | { kind: 'CREATE_COLUMN'; name: string }
  | { kind: 'RENAME_COLUMN'; columnId: string; name: string }
  | { kind: 'REORDER_COLUMNS'; columnOrder: string[] }
  | { kind: 'CREATE_CARD'; columnId: string; title: string; description?: string }
  | { kind: 'UPDATE_CARD'; cardId: string; patch: Partial<Pick<Card, 'title' | 'description' | 'assigneeId'>> }
  | { kind: 'MOVE_CARD'; cardId: string; toColumnId: string; toIndex: number }
  | { kind: 'DELETE_CARD'; cardId: string };

export class MutationError extends Error {}

export class BoardStore {
  private readonly boards = new Map<string, BoardState>();
  private readonly db: InstanceType<typeof DatabaseSync>;

  constructor(dbPath: string) {
    this.db = new DatabaseSync(dbPath);
    this.db.exec('CREATE TABLE IF NOT EXISTS boards (id TEXT PRIMARY KEY, data TEXT NOT NULL)');
  }

  /** Loads from the on-disk row if present, otherwise creates a fresh board with three default columns. */
  getOrCreateBoard(boardId: string, name?: string): Board {
    const state = this.loadOrCreate(boardId, name);
    return this.toSnapshot(state);
  }

  getSeq(boardId: string): number {
    return this.mustGet(boardId).seq;
  }

  applyMutation(boardId: string, originUserId: string, input: MutationInput): { seq: number; event: MutationEvent } {
    const state = this.mustGet(boardId);
    const event = this.mutate(state, input);
    state.seq += 1;
    this.persist(state);
    return { seq: state.seq, event };
  }

  toSnapshot(state: BoardState): Board {
    const columns: Column[] = state.columnOrder.map((id, order) => ({
      id,
      boardId: state.id,
      name: state.columns.get(id)!.name,
      order,
    }));
    const cards: Card[] = [];
    for (const columnId of state.columnOrder) {
      const ids = state.cardOrderByColumn.get(columnId) ?? [];
      ids.forEach((cardId, order) => {
        const c = state.cards.get(cardId)!;
        cards.push({ id: c.id, columnId, title: c.title, description: c.description, assigneeId: c.assigneeId, order });
      });
    }
    return { id: state.id, name: state.name, columns, cards };
  }

  private loadOrCreate(boardId: string, name?: string): BoardState {
    let state = this.boards.get(boardId);
    if (state) return state;

    const row = this.db.prepare('SELECT data FROM boards WHERE id = ?').get(boardId) as { data: string } | undefined;
    if (row) {
      const parsed = JSON.parse(row.data) as PersistedShape;
      state = {
        id: parsed.id,
        name: parsed.name,
        seq: parsed.seq,
        columnOrder: parsed.columnOrder,
        columns: new Map(parsed.columns),
        cards: new Map(parsed.cards),
        cardOrderByColumn: new Map(parsed.cardOrderByColumn),
      };
    } else {
      const defaultColumns: ColumnInternal[] = [
        { id: randomUUID(), name: 'To Do' },
        { id: randomUUID(), name: 'In Progress' },
        { id: randomUUID(), name: 'Done' },
      ];
      state = {
        id: boardId,
        name: name?.trim() || 'Untitled board',
        seq: 0,
        columnOrder: defaultColumns.map((c) => c.id),
        columns: new Map(defaultColumns.map((c) => [c.id, c])),
        cards: new Map(),
        cardOrderByColumn: new Map(defaultColumns.map((c) => [c.id, []])),
      };
      this.persist(state);
    }
    this.boards.set(boardId, state);
    return state;
  }

  private mustGet(boardId: string): BoardState {
    const state = this.boards.get(boardId);
    if (!state) throw new MutationError(`Unknown board ${boardId}`);
    return state;
  }

  private persist(state: BoardState): void {
    const shape: PersistedShape = {
      id: state.id,
      name: state.name,
      seq: state.seq,
      columnOrder: state.columnOrder,
      columns: [...state.columns.entries()],
      cards: [...state.cards.entries()],
      cardOrderByColumn: [...state.cardOrderByColumn.entries()],
    };
    this.db
      .prepare('INSERT INTO boards (id, data) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET data = excluded.data')
      .run(state.id, JSON.stringify(shape));
  }

  private mutate(state: BoardState, input: MutationInput): MutationEvent {
    switch (input.kind) {
      case 'CREATE_COLUMN': {
        const column: ColumnInternal = { id: randomUUID(), name: input.name.trim() || 'Untitled column' };
        state.columns.set(column.id, column);
        state.columnOrder.push(column.id);
        state.cardOrderByColumn.set(column.id, []);
        return { kind: 'COLUMN_CREATED', column: { id: column.id, boardId: state.id, name: column.name, order: state.columnOrder.length - 1 } };
      }
      case 'RENAME_COLUMN': {
        const column = this.requireColumn(state, input.columnId);
        column.name = input.name.trim() || column.name;
        return { kind: 'COLUMN_RENAMED', columnId: column.id, name: column.name };
      }
      case 'REORDER_COLUMNS': {
        const valid = input.columnOrder.filter((id) => state.columns.has(id));
        const missing = state.columnOrder.filter((id) => !valid.includes(id));
        state.columnOrder = [...valid, ...missing];
        return { kind: 'COLUMNS_REORDERED', columnOrder: state.columnOrder };
      }
      case 'CREATE_CARD': {
        this.requireColumn(state, input.columnId);
        const card: CardInternal = { id: randomUUID(), title: input.title.trim() || 'Untitled card', description: input.description };
        state.cards.set(card.id, card);
        const order = state.cardOrderByColumn.get(input.columnId)!;
        order.push(card.id);
        return {
          kind: 'CARD_CREATED',
          card: { id: card.id, columnId: input.columnId, title: card.title, description: card.description, order: order.length - 1 },
        };
      }
      case 'UPDATE_CARD': {
        const card = this.requireCard(state, input.cardId);
        Object.assign(card, input.patch);
        return { kind: 'CARD_UPDATED', cardId: card.id, patch: input.patch };
      }
      case 'MOVE_CARD': {
        const card = this.requireCard(state, input.cardId);
        const fromColumnId = this.columnOf(state, card.id);
        this.requireColumn(state, input.toColumnId);

        const fromOrder = state.cardOrderByColumn.get(fromColumnId)!;
        fromOrder.splice(fromOrder.indexOf(card.id), 1);

        const toOrder = fromColumnId === input.toColumnId ? fromOrder : state.cardOrderByColumn.get(input.toColumnId)!;
        const clampedIndex = Math.max(0, Math.min(input.toIndex, toOrder.length));
        toOrder.splice(clampedIndex, 0, card.id);

        const orders: Record<string, string[]> = { [input.toColumnId]: [...toOrder] };
        if (fromColumnId !== input.toColumnId) orders[fromColumnId] = [...fromOrder];

        return { kind: 'CARD_MOVED', cardId: card.id, fromColumnId, toColumnId: input.toColumnId, orders };
      }
      case 'DELETE_CARD': {
        const card = this.requireCard(state, input.cardId);
        const columnId = this.columnOf(state, card.id);
        const order = state.cardOrderByColumn.get(columnId)!;
        order.splice(order.indexOf(card.id), 1);
        state.cards.delete(card.id);
        return { kind: 'CARD_DELETED', cardId: card.id, columnId, order: [...order] };
      }
    }
  }

  private requireColumn(state: BoardState, columnId: string): ColumnInternal {
    const column = state.columns.get(columnId);
    if (!column) throw new MutationError(`Unknown column ${columnId}`);
    return column;
  }

  private requireCard(state: BoardState, cardId: string): CardInternal {
    const card = state.cards.get(cardId);
    if (!card) throw new MutationError(`Unknown card ${cardId}`);
    return card;
  }

  private columnOf(state: BoardState, cardId: string): string {
    for (const [columnId, ids] of state.cardOrderByColumn) {
      if (ids.includes(cardId)) return columnId;
    }
    throw new MutationError(`Card ${cardId} is not in any column`);
  }
}
