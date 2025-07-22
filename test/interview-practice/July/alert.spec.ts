import { test, expect } from '@playwright/test';

test('Handle JS alert on blogspot', async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  await expect(page).toHaveTitle('Automation Testing Practice');

  const [dialog] = await Promise.all([
    page.waitForEvent('dialog'),     // Wait for alert
    page.click('#alertBtn'),         // Click button that triggers alert
  ]);

  console.log('Alert says:', dialog.message()); // Debug output
  await dialog.accept();                         // Accept alert
});