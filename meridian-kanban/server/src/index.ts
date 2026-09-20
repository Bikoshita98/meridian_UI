import { createKanbanServer } from './ws-server.js';

const port = Number(process.env.PORT ?? 8787);
const dbPath = process.env.KANBAN_DB_PATH ?? 'kanban.sqlite';

createKanbanServer({ port, dbPath }).then((handle) => {
  console.log(`meridian-kanban server listening on ws://localhost:${handle.port}`);
});
