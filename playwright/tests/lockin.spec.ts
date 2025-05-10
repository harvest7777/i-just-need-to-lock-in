import { test, expect } from '@playwright/test';
test.use({ storageState: require.resolve('.//user.json') }); 

test('check if "Top" is on the page', async ({ page }) => {
  await page.goto('http://localhost:3000/leaderboard');

  await expect(page.locator('body')).toContainText('Top');
});
