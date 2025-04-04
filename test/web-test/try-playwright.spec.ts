//WebElemet - https://try.playwright.tech/?l=playwright-test&s=ogj2nnc

import { test, expect } from '@playwright/test';
const baseURL = "https://testautomationpractice.blogspot.com/";

test.describe('Playwright - WebElements', () => {
test('Get title', async ({ page }) => {
  await page.goto(baseURL);
  console.log(await page.title());
});

test('has title', async ({ page }) => {
  await page.goto(baseURL);
  await expect(page).toHaveTitle(/Automation Testing Practice/);
});

test('Element - isVisible()', async ({ page }) => {
  await page.goto(baseURL);
  await page.locator('.name').isVisible();
});

test('Checkbox - Assertion', async ({ page }) => {
  await page.goto(baseURL);
  await page.locator('#sunday').check();
  await expect(page.locator('#sunday')).toBeChecked();
  await page.locator('#sunday').uncheck();
  await expect(page.locator('#sunday')).not.toBeChecked();
});

test('RadioButton - Assertion', async ({ page }) => {
  await page.goto(baseURL);
  const male = page.locator('input[value="male"]');
  await male.check();
  await expect(male).toBeChecked();
  const female = page.locator('input[value="female"]');
  await expect(female).not.toBeChecked();
});

test('InputBox - Assertion', async ({ page }) => {
  await page.goto(baseURL);
  const name = page.locator('input[id="field1"]');
  await expect(name).toHaveValue('Hello World!');
});

test('Select Dropdown', async ({ page }) => {
  await page.goto(baseURL);
  await page.selectOption('//*[@id="country"]',{value:'canada'});
});






});

