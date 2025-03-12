import { test, expect } from '@playwright/test';

const baseURL = process.env.BASEURL as string;
if (!baseURL) {
  throw new Error('BASEURL environment variable is not defined');
}
const username = process.env.MAILID as string;
if (!username) {
  throw new Error('MAILID environment variable is not defined');
}
const password = process.env.PASSWORD as string;
if (!password) {
  throw new Error('PASSWORD environment variable is not defined');
}

test('test', async ({ page }) => {
  // Goto Base URL
  await page.goto(baseURL);
  // Input Login
  await page.locator('input#email').fill(username);
  await page.locator('input#password').fill(password);
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('heading', { name: 'Contact List' })).toBeVisible();
  await page.waitForTimeout(2000); // Adjust timing if necessary
  await page.context().storageState({ path: "./src/setup/web-loginAuth.json" });
});