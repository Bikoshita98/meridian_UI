# Master Prompt — Build "Meridian Kanban" (Real-Time Collaborative Board)

> Copy everything below the line into your AI coding agent as a single instruction.

---

## Role & Objective

You are building **Meridian Kanban**, a real-time collaborative Kanban/project board consuming the
already-built `@meridian/ui` design system. Two runtime pieces:

1. **Client** — an Angular app (same tooling generation as `meridian-demo/`) that renders boards,
   columns, and cards, and lets a user drag cards between columns.
2. **Server** — a small Node/TypeScript WebSocket service that is the single source of truth for
   board state, broadcasts changes to every connected client, and persists state so a board survives
   a server restart.

"Real-time collaborative" means: two browser tabs/users on the same board see each other's card
moves, creates, and edits without a manual refresh, converge on the same final state even if their
actions race, and recover cleanly after a dropped connection.

## Tech Stack (fixed)

**Client**
- Angular 20+ (match whatever version `meridian-ui`/`meridian-demo` currently pin), standalone
  components, esbuild `@angular/build:application` builder — same CLI generation as `meridian-demo`.
- Consumes `@meridian/ui` the same way `meridian-demo` does: `npm install ../dist/meridian-ui
  --install-links`, imported per-component sub-path (`@meridian/ui/card`, never a root barrel).
- `@angular/cdk/drag-drop` (`cdkDropList`/`cdkDrag`) for card/column dragging — this is *not* part of
  `meridian-ui`, compose it directly on top of `mr-card`, consistent with how `modal`/`select`/
  `dropdown` already build on top of CDK Overlay rather than reinventing it.
- Plain browser `WebSocket`, no client-side socket library (Socket.IO, etc.) — the protocol below is
  simple enough not to need one, and hand-rolling it is the point.
- Jest + `jest-preset-angular`, matching `meridian-ui`'s test tooling.

**Server**
- Node + TypeScript, the `ws` package for WebSocket handling (not Socket.IO — no client-side
  reconnection/room magic to lean on; rooms and reconnection are protocol you design and own).
- `better-sqlite3` for persistence — one file, no external DB process, keeps the whole project
  self-contained and runnable with `npm run dev` and nothing else installed.
- No auth provider, no session framework — see "What NOT to Build."

## Folder Layout

No monorepo tooling in this repo (established precedent from `meridian-ui`/`meridian-demo`), and
client + server here are two halves of one product rather than two independently consumable
artifacts, so:

```
meridian-kanban/
  docs/
    BUILD_PROMPT.md        # this file
  client/                  # Angular app, own package.json/angular.json
    src/app/
      board/               # board page: columns + cards + drag-drop
      presence/            # avatar face-pile, presence service
      realtime/            # WebSocket client service, reconciliation logic
      join/                # name-entry / board-join screen
  server/                  # Node/TS app, own package.json
    src/
      ws-server.ts         # connection handling, room membership
      board-store.ts       # in-memory board state + SQLite persistence
      protocol.ts          # shared message-type definitions (mirrored on client via a copied/ synced types file — no shared npm package, two small files kept in sync by hand is fine at this scale)
```

## Data Model

```ts
type User = { id: string; name: string; colorSeed: string } // ephemeral, chosen at join, not persisted

type Card = {
  id: string
  columnId: string
  title: string
  description?: string
  order: number        // fractional or integer index within its column
  assigneeId?: string
}

type Column = { id: string; boardId: string; name: string; order: number }

type Board = { id: string; name: string; columns: Column[]; cards: Card[] }
```

One board = one "room," addressable by a short board id in the URL (`/board/:id`). No workspace/
multi-board dashboard hierarchy for v1 — see scope cuts below.

## Real-Time Protocol & Reconciliation

This is the actual engineering content of the project — design it deliberately, don't default to a
library:

- **Server is authoritative.** Every board has a monotonically increasing `seq` counter. Any
  mutation (move card, create card, rename column, etc.) is only "real" once the server has applied
  it and assigned it the next `seq`.
- **Optimistic client apply.** On a drag-drop or edit, the client immediately updates its own local
  view (so dragging feels instant) and sends a mutation message tagged with a client-generated
  `clientEventId`.
- **Server applies and broadcasts.** The server applies the mutation to its in-memory state, persists
  it, assigns the next `seq`, and broadcasts the resulting event (with `seq` and the resolved final
  values — e.g. the card's actual final `order`) to every client in that board's room, *including the
  sender*.
- **Reconciliation on receipt.**
  - If the event's `clientEventId` matches one this client sent, it's a confirmation — replace the
    optimistic guess with the server's authoritative values (they'll usually match; if the server
    resolved a conflict differently, this snaps the UI to the real result).
  - If it's from another client, apply it directly.
  - Conflict rule: **last-write-wins by arrival order at the server**, not by client timestamp (client
    clocks aren't trustworthy). No CRDT, no operational-transform — Kanban card position is a small,
    coarse-grained piece of state where true simultaneous conflicting drags are rare and "the second
    one to reach the server wins, everyone snaps to that" is an honest, explainable, correct-enough
    resolution. Document this tradeoff explicitly in code comments/README — it's a deliberate
    simplicity choice, not an oversight.
- **Reconnect / resync.** On WebSocket open (including reconnect after a drop), the client sends
  `SYNC_REQUEST` and the server replies with the full current `Board` state (not a replayed event
  log) — simplest correct way to guarantee convergence after any gap, at the cost of re-sending full
  state rather than a delta. Fine at Kanban-board scale.
- **Presence.** Server tracks which users are currently connected to a room (ephemeral, not
  persisted) and broadcasts `USER_JOINED`/`USER_LEFT`. No live cursor position — see scope cuts.

## Component Architecture — mapping to `@meridian/ui`

- `mr-card` (elevated variant) — both the column container chrome and each individual card.
- `mr-avatar` — presence face-pile at the top of the board, and card assignee.
- `mr-badge` — card labels/status.
- `mr-input-field` — inline card-title editing, board name, the join/name-entry screen.
- `mr-modal` — "add card" / "edit card" detail dialog.
- `mr-dropdown` — per-card context menu (edit / assign / delete).
- `mr-button` — primary actions (add card, add column, join).
- `mr-toast` (service) — "X moved a card," "connection lost — reconnecting," "reconnected, board
  resynced," validation errors. This is the most natural place in the whole app to surface real-time
  activity, use it generously.
- `mr-spinner` — initial board load and the reconnect-in-progress state.
- `mr-tooltip` — icon-only buttons (e.g. a bare delete/drag-handle icon).
- Follow `CONVENTIONS.md` throughout: sub-path imports only, no `ngClass`/`ngStyle`, `OnPush` on
  every component, no raw hex/spacing values outside what `meridian-ui`'s tokens already expose.

## Feature Scope (v1 / MVP)

- Join a board by id (or create a new one) with just a display name — no password, no account.
- Columns: create, rename, reorder.
- Cards: create, edit title/description, delete, assign to a present user, drag between/within
  columns.
- Live presence face-pile; toast on remote card moves.
- Reconnect banner + automatic resync after a dropped connection.

## What NOT to Build (v1)

- No real authentication/authorization — name-only join is intentional, not a placeholder to "finish
  later."
- No CRDT library (Yjs/Automerge) — last-write-wins + full-resync-on-reconnect is the deliberate
  choice; don't reach for a CRDT "to be safe."
- No live mouse-cursor tracking — presence face-pile is enough for v1.
- No multi-board workspace/dashboard hierarchy — one board per room/URL.
- No offline mode / service worker.
- No card comments, attachments, or activity log beyond the toast notifications already specified.
- No custom mobile layout beyond whatever `meridian-ui`'s existing responsive tokens give for free.

## Testing

- Client: Jest unit tests for the reconciliation service (optimistic-apply, confirm, conflict-snap,
  resync) — this logic is the heart of the project and should be the most heavily tested part, not an
  afterthought.
- Server: a `ws`-client-driven integration test simulating two connections mutating the same board
  and asserting both converge to the same final state.
- A Playwright smoke test driving two real browser contexts against one board, dragging a card in one
  and asserting it appears moved in the other — the equivalent of `meridian-demo`'s "actually render
  it and prove it" verification step from `STATUS.md`, applied to the sync behavior specifically.

## Governance

- Continue this repo's existing pattern: `STATUS.md` at the repo root stays the single running build
  log (append to it, don't fork a separate one for this app) — but this scope's individual `docs/
  BUILD_PROMPT.md` and any deviations get recorded there exactly as `meridian-ui`'s were.
- Treat `CONVENTIONS.md` as still binding for any consumption of `@meridian/ui` components.
