import { test, expect } from '@playwright/test';

const baseURL = process.env.BASEURL;
if (!baseURL) {
  throw new Error('BASEURL environment variable is not defined');
}
const username = process.env.MAILID as string;
if (!username) {
  throw new Error('MAILID environment variable is not defined');
}
const password = process.env.PASSWORD;
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
  // Goto Home Page
  await page.getByRole('heading', { name: 'Contact List' }).click();
  // Logout and Goto LoginPage
  await page.getByRole('button', { name: 'Logout' }).click();
  await page.getByRole('heading', { name: 'Contact List App' }).click();
});