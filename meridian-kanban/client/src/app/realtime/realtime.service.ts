import { Injectable, computed, signal } from '@angular/core';
import { MrToastService } from '@meridian/ui/toast';
import { BoardReconciler, guess } from './reconciler';
import type { Board, ClientMessage, MutationEvent, ServerMessage, User } from './protocol';

export type ConnectionStatus = 'connecting' | 'open' | 'reconnecting' | 'closed';

const RECONNECT_DELAYS_MS = [500, 1000, 2000, 4000, 8000];

/**
 * Thin WebSocket transport wrapper around `BoardReconciler` — all the actual reconciliation logic
 * lives there (and is unit-tested there, without a real socket). This service owns the socket
 * lifecycle, reconnect-with-backoff, and translating user actions into `ClientMessage`s.
 */
@Injectable({ providedIn: 'root' })
export class RealtimeService {
  private readonly reconciler = new BoardReconciler();

  private readonly _status = signal<ConnectionStatus>('connecting');
  readonly status = this._status.asReadonly();

  private readonly _board = signal<Board | null>(null);
  readonly board = this._board.asReadonly();

  private readonly _users = signal<User[]>([]);
  readonly users = this._users.asReadonly();

  private readonly _selfUserId = signal<string | null>(null);
  readonly selfUserId = this._selfUserId.asReadonly();

  readonly otherUsers = computed(() => this._users().filter((u) => u.id !== this._selfUserId()));

  private ws: WebSocket | null = null;
  private reconnectAttempt = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private boardId = '';
  private boardName: string | undefined;
  private userName = '';
  private wasEverOpen = false;
  // Guards against a "Connection lost" toast per failed reconnect attempt: `close` fires again for
  // every socket opened by `scheduleReconnect()` while the server is still down, not just once per
  // disconnect episode. Reset when a `JOINED` confirms the connection is actually back.
  private reconnectToastShown = false;

  constructor(private readonly toast: MrToastService) {}

  connect(boardId: string, userName: string, boardName?: string): void {
    this.boardId = boardId;
    this.userName = userName;
    this.boardName = boardName;
    this.reconnectAttempt = 0;
    this.openSocket();
  }

  disconnect(): void {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.ws?.close();
    this.ws = null;
  }

  private wsUrl(): string {
    // No environment-file setup for a single fixed backend port — this is a two-process local dev
    // app, not a multi-environment deployment; the server always listens on 8787 (see server/src/index.ts).
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    return `${protocol}://${window.location.hostname}:8787`;
  }

  private openSocket(): void {
    this._status.set(this.wasEverOpen ? 'reconnecting' : 'connecting');
    const ws = new WebSocket(this.wsUrl());
    this.ws = ws;

    ws.addEventListener('open', () => {
      this.reconnectAttempt = 0;
      this.send({ type: 'JOIN', boardId: this.boardId, boardName: this.boardName, userName: this.userName });
    });

    ws.addEventListener('message', (ev) => this.handleMessage(JSON.parse(ev.data) as ServerMessage));

    ws.addEventListener('close', () => {
      if (this.wasEverOpen && !this.reconnectToastShown) {
        this.reconnectToastShown = true;
        this.toast.show('Connection lost — reconnecting…', { status: 'warning', duration: 0 });
      }
      this.scheduleReconnect();
    });

    ws.addEventListener('error', () => ws.close());
  }

  private scheduleReconnect(): void {
    this._status.set('reconnecting');
    const delay = RECONNECT_DELAYS_MS[Math.min(this.reconnectAttempt, RECONNECT_DELAYS_MS.length - 1)];
    this.reconnectAttempt += 1;
    this.reconnectTimer = setTimeout(() => this.openSocket(), delay);
  }

  private send(message: ClientMessage): void {
    if (this.ws?.readyState === WebSocket.OPEN) this.ws.send(JSON.stringify(message));
  }

  private handleMessage(msg: ServerMessage): void {
    switch (msg.type) {
      case 'JOINED': {
        const resyncing = this.wasEverOpen;
        this.wasEverOpen = true;
        this._selfUserId.set(msg.userId);
        const state = this.reconciler.setInitial(msg.board, msg.users);
        this._board.set(state.board);
        this._users.set(state.users);
        this._status.set('open');
        this.reconnectToastShown = false;
        if (resyncing) this.toast.show('Reconnected — board resynced.', { status: 'success' });
        return;
      }
      case 'BOARD_STATE': {
        const state = this.reconciler.applyBoardState(msg.board, msg.users);
        this._board.set(state.board);
        this._users.set(state.users);
        return;
      }
      case 'EVENT': {
        const state = this.reconciler.applyServerEvent(msg.clientEventId, msg.event);
        this._board.set(state.board);
        if (msg.originUserId !== this._selfUserId()) {
          this.toast.show(describeRemoteEvent(msg.event), { status: 'info', duration: 3000 });
        }
        return;
      }
      case 'USER_JOINED': {
        const state = this.reconciler.addUser(msg.user);
        this._users.set(state.users);
        if (msg.user.id !== this._selfUserId()) this.toast.show(`${msg.user.name} joined the board.`, { status: 'info' });
        return;
      }
      case 'USER_LEFT': {
        const leaving = this._users().find((u) => u.id === msg.userId);
        const state = this.reconciler.removeUser(msg.userId);
        this._users.set(state.users);
        if (leaving) this.toast.show(`${leaving.name} left the board.`, { status: 'info' });
        return;
      }
      case 'ERROR':
        this.toast.show(msg.message, { status: 'error' });
        return;
    }
  }

  private clientEventId(): string {
    return crypto.randomUUID();
  }

  createColumn(name: string): void {
    const board = this._board();
    if (!board) return;
    const clientEventId = this.clientEventId();
    const tempId = `temp-${clientEventId}`;
    const state = this.reconciler.applyOptimistic(clientEventId, guess.createColumn(board, name, tempId));
    this._board.set(state.board);
    this.send({ type: 'CREATE_COLUMN', clientEventId, name });
  }

  renameColumn(columnId: string, name: string): void {
    const clientEventId = this.clientEventId();
    const state = this.reconciler.applyOptimistic(clientEventId, { kind: 'COLUMN_RENAMED', columnId, name });
    this._board.set(state.board);
    this.send({ type: 'RENAME_COLUMN', clientEventId, columnId, name });
  }

  reorderColumns(columnOrder: string[]): void {
    const clientEventId = this.clientEventId();
    const state = this.reconciler.applyOptimistic(clientEventId, { kind: 'COLUMNS_REORDERED', columnOrder });
    this._board.set(state.board);
    this.send({ type: 'REORDER_COLUMNS', clientEventId, columnOrder });
  }

  createCard(columnId: string, title: string, description?: string): void {
    const board = this._board();
    if (!board) return;
    const clientEventId = this.clientEventId();
    const tempId = `temp-${clientEventId}`;
    const state = this.reconciler.applyOptimistic(clientEventId, guess.createCard(board, columnId, title, description, tempId));
    this._board.set(state.board);
    this.send({ type: 'CREATE_CARD', clientEventId, columnId, title, description });
  }

  updateCard(cardId: string, patch: { title?: string; description?: string; assigneeId?: string }): void {
    const clientEventId = this.clientEventId();
    const state = this.reconciler.applyOptimistic(clientEventId, { kind: 'CARD_UPDATED', cardId, patch });
    this._board.set(state.board);
    this.send({ type: 'UPDATE_CARD', clientEventId, cardId, patch });
  }

  moveCard(cardId: string, toColumnId: string, toIndex: number): void {
    const board = this._board();
    if (!board) return;
    const clientEventId = this.clientEventId();
    const state = this.reconciler.applyOptimistic(clientEventId, guess.moveCard(board, cardId, toColumnId, toIndex));
    this._board.set(state.board);
    this.send({ type: 'MOVE_CARD', clientEventId, cardId, toColumnId, toIndex });
  }

  deleteCard(cardId: string): void {
    const board = this._board();
    if (!board) return;
    const clientEventId = this.clientEventId();
    const state = this.reconciler.applyOptimistic(clientEventId, guess.deleteCard(board, cardId));
    this._board.set(state.board);
    this.send({ type: 'DELETE_CARD', clientEventId, cardId });
  }
}

function describeRemoteEvent(event: MutationEvent): string {
  switch (event.kind) {
    case 'CARD_CREATED':
      return `A card was added: "${event.card.title}"`;
    case 'CARD_MOVED':
      return 'A card was moved.';
    case 'CARD_DELETED':
      return 'A card was deleted.';
    case 'CARD_UPDATED':
      return 'A card was updated.';
    case 'COLUMN_CREATED':
      return `A column was added: "${event.column.name}"`;
    case 'COLUMN_RENAMED':
      return `A column was renamed to "${event.name}"`;
    case 'COLUMNS_REORDERED':
      return 'Columns were reordered.';
  }
}
