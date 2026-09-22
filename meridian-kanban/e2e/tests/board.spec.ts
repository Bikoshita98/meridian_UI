import { test, expect, type Page } from '@playwright/test';

function boardIdFromUrl(url: string): string {
  const match = url.match(/\/board\/([^/?#]+)/);
  if (!match) throw new Error(`Not a board URL: ${url}`);
  return match[1];
}

async function createBoard(page: Page, userName: string, boardName: string): Promise<string> {
  await page.goto('/');
  await page.getByLabel('Your name').fill(userName);
  await page.getByLabel('Board name (optional)').fill(boardName);
  await page.getByRole('button', { name: 'Create board' }).click();
  await page.waitForURL(/\/board\//);
  await expect(page.getByRole('heading', { name: boardName })).toBeVisible();
  return boardIdFromUrl(page.url());
}

async function joinBoard(page: Page, userName: string, boardId: string): Promise<void> {
  await page.goto('/');
  await page.getByLabel('Your name').fill(userName);
  await page.getByLabel('Board ID').fill(boardId);
  await page.getByRole('button', { name: 'Join board' }).click();
  await page.waitForURL(new RegExp(`/board/${boardId}$`));
}

function columnCards(page: Page, columnName: string) {
  return page.locator(`[data-testid="column"][data-column-name="${columnName}"] [data-testid="column-cards"]`);
}

function addCardButton(page: Page, columnName: string) {
  return page.locator(`[data-testid="column"][data-column-name="${columnName}"]`).getByRole('button', { name: 'Add a card' });
}

// The end-to-end smoke test required by docs/BUILD_PROMPT.md's Testing section: two real browser
// contexts on one board, proving a mutation made by one client converges on the other purely via
// the server's websocket broadcast — no reload on either side.
test('two clients converge on a card created and dragged across columns', async ({ browser }) => {
  const contextA = await browser.newContext();
  const contextB = await browser.newContext();
  const pageA = await contextA.newPage();
  const pageB = await contextB.newPage();

  try {
    const boardName = `E2E Board ${Date.now()}`;
    const cardTitle = `E2E card ${Date.now()}`;

    const boardId = await createBoard(pageA, 'Alice', boardName);
    await joinBoard(pageB, 'Bob', boardId);
    await expect(pageB.getByRole('heading', { name: boardName })).toBeVisible();

    // Alice creates a card in the default "To Do" column.
    await addCardButton(pageA, 'To Do').click();
    await pageA.getByLabel('Title').fill(cardTitle);
    await pageA.getByRole('button', { name: 'Save' }).click();

    // It shows up on Alice's own board...
    await expect(columnCards(pageA, 'To Do').getByText(cardTitle)).toBeVisible();
    // ...and, without Bob ever reloading, on Bob's — proving the create broadcasts live.
    await expect(columnCards(pageB, 'To Do').getByText(cardTitle)).toBeVisible();

    // Alice drags the card from "To Do" into "In Progress". Real pointer events, not a
    // synthetic `dragTo` — CDK's drag-drop needs an initial move past its drag-start distance
    // threshold before it starts tracking the pointer, matching the multi-step approach this
    // project's own manual Playwright verification (see STATUS.md) found necessary.
    const source = columnCards(pageA, 'To Do').locator('[data-testid="card"]').filter({ hasText: cardTitle });
    const targetColumn = columnCards(pageA, 'In Progress');
    const sourceBox = await source.boundingBox();
    const targetBox = await targetColumn.boundingBox();
    if (!sourceBox || !targetBox) throw new Error('Could not measure drag source/target bounding boxes');

    const startX = sourceBox.x + sourceBox.width / 2;
    const startY = sourceBox.y + sourceBox.height / 2;
    const endX = targetBox.x + targetBox.width / 2;
    const endY = targetBox.y + Math.min(targetBox.height / 2, 40);

    await pageA.mouse.move(startX, startY);
    await pageA.mouse.down();
    await pageA.mouse.move(startX + 5, startY - 5, { steps: 5 });
    await pageA.mouse.move(endX, endY, { steps: 20 });
    await pageA.waitForTimeout(150);
    await pageA.mouse.up();

    // Converges for the dragger...
    await expect(columnCards(pageA, 'In Progress').getByText(cardTitle)).toBeVisible();
    await expect(columnCards(pageA, 'To Do').getByText(cardTitle)).toHaveCount(0);
    // ...and for the other client, purely from the server's broadcast.
    await expect(columnCards(pageB, 'In Progress').getByText(cardTitle)).toBeVisible();
    await expect(columnCards(pageB, 'To Do').getByText(cardTitle)).toHaveCount(0);
  } finally {
    await contextA.close();
    await contextB.close();
  }
});
