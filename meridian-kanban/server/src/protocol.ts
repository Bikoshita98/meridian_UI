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
  /** Ids into the client's static `LABEL_PRESETS` table — not free text/color, see board.page.ts. */
  labelIds?: string[];
  /** ISO date (`yyyy-mm-dd`), no time component. */
  dueDate?: string;
  /** One of the 7 semantic colors `@meridian/ui` badges already use — never a raw hex value. */
  coverColor?: string;
};

export type Column = { id: string; boardId: string; name: string; order: number };

export type Board = { id: string; name: string; columns: Column[]; cards: Card[] };

// `null` means "clear this field," an omitted key means "leave it alone" — distinct from `undefined`,
// which `JSON.stringify` drops entirely, so a patch that used `undefined` to mean "clear" could never
// actually travel over the wire as a clear instruction. `labelIds` is the exception: it's always a
// full replacement array (never a delta), so an empty array already means "no labels" without needing
// the null trick.
export type CardPatch = {
  title?: string;
  description?: string | null;
  assigneeId?: string | null;
  labelIds?: string[];
  dueDate?: string | null;
  coverColor?: string | null;
};

// ---- Mutation events (server-resolved, broadcast to every client in the room) ----

export type MutationEvent =
  | { kind: 'COLUMN_CREATED'; column: Column }
  | { kind: 'COLUMN_RENAMED'; columnId: string; name: string }
  | { kind: 'COLUMNS_REORDERED'; columnOrder: string[] }
  | { kind: 'CARD_CREATED'; card: Card }
  | { kind: 'CARD_UPDATED'; cardId: string; patch: CardPatch }
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
  | { type: 'UPDATE_CARD'; clientEventId: string; cardId: string; patch: CardPatch }
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
