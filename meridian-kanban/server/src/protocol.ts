/**
 * Wire protocol between client and server. This file is hand-mirrored into
 * `client/src/app/realtime/protocol.ts` — no shared npm package at this scale (see BUILD_PROMPT.md's
 * Folder Layout note). Keep the two in sync by hand when editing.
 */

export type User = { id: string; name: string; colorSeed: string };

export type Card = {
  id: string;
  columnId: string;
  title: string;
  description?: string;
  order: number;
  assigneeId?: string;
};

export type Column = { id: string; boardId: string; name: string; order: number };

export type Board = { id: string; name: string; columns: Column[]; cards: Card[] };

// ---- Mutation events (server-resolved, broadcast to every client in the room) ----

export type MutationEvent =
  | { kind: 'COLUMN_CREATED'; column: Column }
  | { kind: 'COLUMN_RENAMED'; columnId: string; name: string }
  | { kind: 'COLUMNS_REORDERED'; columnOrder: string[] }
  | { kind: 'CARD_CREATED'; card: Card }
  | { kind: 'CARD_UPDATED'; cardId: string; patch: Partial<Pick<Card, 'title' | 'description' | 'assigneeId'>> }
  | {
      kind: 'CARD_MOVED';
      cardId: string;
      fromColumnId: string;
      toColumnId: string;
      /** Full ordered card-id list per affected column (1 entry if reordered within one column, 2 if moved across columns) — clients replace, never merge, these arrays. */
      orders: Record<string, string[]>;
    }
  | { kind: 'CARD_DELETED'; cardId: string; columnId: string; order: string[] };

// ---- Client -> Server ----

export type ClientMessage =
  | { type: 'JOIN'; boardId: string; boardName?: string; userName: string }
  | { type: 'SYNC_REQUEST' }
  | { type: 'CREATE_COLUMN'; clientEventId: string; name: string }
  | { type: 'RENAME_COLUMN'; clientEventId: string; columnId: string; name: string }
  | { type: 'REORDER_COLUMNS'; clientEventId: string; columnOrder: string[] }
  | { type: 'CREATE_CARD'; clientEventId: string; columnId: string; title: string; description?: string }
  | {
      type: 'UPDATE_CARD';
      clientEventId: string;
      cardId: string;
      patch: Partial<Pick<Card, 'title' | 'description' | 'assigneeId'>>;
    }
  | { type: 'MOVE_CARD'; clientEventId: string; cardId: string; toColumnId: string; toIndex: number }
  | { type: 'DELETE_CARD'; clientEventId: string; cardId: string };

// ---- Server -> Client ----

export type ServerMessage =
  | { type: 'JOINED'; userId: string; board: Board; users: User[] }
  | { type: 'BOARD_STATE'; seq: number; board: Board; users: User[] }
  | { type: 'EVENT'; seq: number; clientEventId?: string; originUserId: string; event: MutationEvent }
  | { type: 'USER_JOINED'; user: User }
  | { type: 'USER_LEFT'; userId: string }
  | { type: 'ERROR'; message: string };
