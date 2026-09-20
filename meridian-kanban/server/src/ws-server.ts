import { randomUUID } from 'node:crypto';
import { createServer, type Server } from 'node:http';
import { WebSocket, WebSocketServer } from 'ws';
import { BoardStore, MutationError, type MutationInput } from './board-store.js';
import type { ClientMessage, ServerMessage, User } from './protocol.js';

interface ConnMeta {
  userId: string;
  userName: string;
  colorSeed: string;
  boardId: string;
}

const COLOR_SEEDS = ['primary', 'secondary', 'success', 'warning', 'error', 'info'];

function pickColorSeed(): string {
  return COLOR_SEEDS[Math.floor(Math.random() * COLOR_SEEDS.length)];
}

export interface KanbanServerHandle {
  server: Server;
  wss: WebSocketServer;
  port: number;
  close(): Promise<void>;
}

export function createKanbanServer(options: { port?: number; dbPath: string }): Promise<KanbanServerHandle> {
  const store = new BoardStore(options.dbPath);
  const rooms = new Map<string, Set<WebSocket>>();
  const meta = new WeakMap<WebSocket, ConnMeta>();

  function usersInRoom(boardId: string): User[] {
    const sockets = rooms.get(boardId);
    if (!sockets) return [];
    const users: User[] = [];
    for (const ws of sockets) {
      const m = meta.get(ws);
      if (m) users.push({ id: m.userId, name: m.userName, colorSeed: m.colorSeed });
    }
    return users;
  }

  function send(ws: WebSocket, message: ServerMessage): void {
    if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(message));
  }

  function broadcast(boardId: string, message: ServerMessage, exclude?: WebSocket): void {
    const sockets = rooms.get(boardId);
    if (!sockets) return;
    for (const ws of sockets) {
      if (ws !== exclude) send(ws, message);
    }
  }

  function handleJoin(ws: WebSocket, msg: Extract<ClientMessage, { type: 'JOIN' }>): void {
    const board = store.getOrCreateBoard(msg.boardId, msg.boardName);
    const connMeta: ConnMeta = {
      userId: randomUUID(),
      userName: msg.userName.trim() || 'Anonymous',
      colorSeed: pickColorSeed(),
      boardId: msg.boardId,
    };
    meta.set(ws, connMeta);

    if (!rooms.has(msg.boardId)) rooms.set(msg.boardId, new Set());
    const room = rooms.get(msg.boardId)!;

    send(ws, { type: 'JOINED', userId: connMeta.userId, board, users: usersInRoom(msg.boardId) });
    broadcast(msg.boardId, { type: 'USER_JOINED', user: { id: connMeta.userId, name: connMeta.userName, colorSeed: connMeta.colorSeed } }, ws);

    room.add(ws);
  }

  function handleMutation(ws: WebSocket, connMeta: ConnMeta, clientEventId: string, input: MutationInput): void {
    try {
      const { seq, event } = store.applyMutation(connMeta.boardId, connMeta.userId, input);
      broadcast(connMeta.boardId, { type: 'EVENT', seq, clientEventId, originUserId: connMeta.userId, event });
    } catch (err) {
      const message = err instanceof MutationError ? err.message : 'Failed to apply mutation';
      send(ws, { type: 'ERROR', message });
    }
  }

  function handleMessage(ws: WebSocket, raw: string): void {
    let msg: ClientMessage;
    try {
      msg = JSON.parse(raw);
    } catch {
      send(ws, { type: 'ERROR', message: 'Malformed message' });
      return;
    }

    if (msg.type === 'JOIN') {
      handleJoin(ws, msg);
      return;
    }

    const connMeta = meta.get(ws);
    if (!connMeta) {
      send(ws, { type: 'ERROR', message: 'Must JOIN before sending other messages' });
      return;
    }

    switch (msg.type) {
      case 'SYNC_REQUEST': {
        const board = store.getOrCreateBoard(connMeta.boardId);
        send(ws, { type: 'BOARD_STATE', seq: store.getSeq(connMeta.boardId), board, users: usersInRoom(connMeta.boardId) });
        return;
      }
      case 'CREATE_COLUMN':
        return handleMutation(ws, connMeta, msg.clientEventId, { kind: 'CREATE_COLUMN', name: msg.name });
      case 'RENAME_COLUMN':
        return handleMutation(ws, connMeta, msg.clientEventId, { kind: 'RENAME_COLUMN', columnId: msg.columnId, name: msg.name });
      case 'REORDER_COLUMNS':
        return handleMutation(ws, connMeta, msg.clientEventId, { kind: 'REORDER_COLUMNS', columnOrder: msg.columnOrder });
      case 'CREATE_CARD':
        return handleMutation(ws, connMeta, msg.clientEventId, {
          kind: 'CREATE_CARD',
          columnId: msg.columnId,
          title: msg.title,
          description: msg.description,
        });
      case 'UPDATE_CARD':
        return handleMutation(ws, connMeta, msg.clientEventId, { kind: 'UPDATE_CARD', cardId: msg.cardId, patch: msg.patch });
      case 'MOVE_CARD':
        return handleMutation(ws, connMeta, msg.clientEventId, {
          kind: 'MOVE_CARD',
          cardId: msg.cardId,
          toColumnId: msg.toColumnId,
          toIndex: msg.toIndex,
        });
      case 'DELETE_CARD':
        return handleMutation(ws, connMeta, msg.clientEventId, { kind: 'DELETE_CARD', cardId: msg.cardId });
    }
  }

  function handleClose(ws: WebSocket): void {
    const connMeta = meta.get(ws);
    if (!connMeta) return;
    const room = rooms.get(connMeta.boardId);
    room?.delete(ws);
    if (room && room.size === 0) rooms.delete(connMeta.boardId);
    broadcast(connMeta.boardId, { type: 'USER_LEFT', userId: connMeta.userId });
  }

  const server = createServer();
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    ws.on('message', (data) => handleMessage(ws, data.toString()));
    ws.on('close', () => handleClose(ws));
  });

  return new Promise((resolve) => {
    server.listen(options.port ?? 0, () => {
      const address = server.address();
      const port = typeof address === 'object' && address ? address.port : options.port!;
      resolve({
        server,
        wss,
        port,
        close: () =>
          new Promise<void>((res) => {
            wss.close(() => server.close(() => res()));
          }),
      });
    });
  });
}
