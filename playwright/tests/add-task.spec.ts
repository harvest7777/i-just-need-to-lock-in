import { test, expect } from '@playwright/test';
test.use({ storageState: require.resolve('.//user.json') });

test('Check if user can add a task', async ({ page }) => {
  await page.goto('http://localhost:3000/lockin');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  await page.fill('#taskName', 'test task');
  await page.click('button[type="submit"].bg-app-highlight');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await expect(page.getByText('test task')).toBeVisible();
});
