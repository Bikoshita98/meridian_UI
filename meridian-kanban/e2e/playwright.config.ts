import { defineConfig } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// A dedicated sqlite file, isolated from whatever a developer has running locally via `npm run
// dev` — the client hardcodes ws://<host>:8787 (see realtime.service.ts), so the real server must
// still bind port 8787; only the persisted data is kept separate.
const dbDir = path.join(dirname, '.tmp');
fs.mkdirSync(dbDir, { recursive: true });
const dbPath = path.join(dbDir, 'e2e-kanban.sqlite');

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4200',
    trace: 'retain-on-failure',
  },
  webServer: [
    {
      command: 'npm run start',
      cwd: path.join(dirname, '..', 'server'),
      port: 8787,
      reuseExistingServer: false,
      timeout: 30_000,
      env: { PORT: '8787', KANBAN_DB_PATH: dbPath },
    },
    {
      command: 'npm run start',
      cwd: path.join(dirname, '..', 'client'),
      url: 'http://localhost:4200',
      reuseExistingServer: false,
      timeout: 120_000,
    },
  ],
});
