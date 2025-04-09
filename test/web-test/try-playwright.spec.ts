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

test('getAllValuesFromDropdown', async ({ page }) => {
  await page.goto(baseURL);
  const options = await page.locator('//*[@id="country"]').evaluateAll
  (elements =>
    elements.map(option => option.textContent?.trim())
  ); 
  console.log('Available countries:', options);
});

test('Select Dropdown', async ({ page }) => {
  await page.goto(baseURL);
  await page.selectOption('//*[@id="country"]',{value:'canada'});
});

test('scrollIntoView', async ({ page }) => {
  await page.goto(baseURL);
  const element = page.locator('#datepicker');
  await element.scrollIntoViewIfNeeded();
  await expect(element).toBeVisible();
});

test('frame', async ({ page }) => {
  await page.goto("https://demo.automationtesting.in/Frames.html");
  const frames = page.frames();
  frames.forEach(f => console.log(f.name()));
  await page.frameLocator('iframe[name="SingleFrame"]').locator('input').fill('Hello World!');

});

test('SimpleAlert', async ({ page }) => {
  await page.goto(baseURL);

  page.on('dialog', async (dialog) => {
    console.log('Alert message:', dialog.message());
    await dialog.accept();
  });
  await page.locator('#alertBtn').click();
});

test('ConfirmAlert', async ({ page }) => {
  await page.goto(baseURL);

  // Register dialog listener BEFORE triggering the alert
  page.on('dialog', async (dialog) => {
    console.log('Confirm message:', dialog.message());
    await dialog.dismiss();
  });

  // Trigger the alert
  await page.locator('#confirmBtn').click();

  // Validate the result text
  await expect(page.locator('#demo')).toHaveText('You pressed Cancel!');
});

test('PromptAlert', async ({ page }) => {
  await page.goto(baseURL);
  const prompt = "Playwright Rocks!"
  // Register dialog listener BEFORE triggering the alert
  page.on('dialog', async (dialog) => {
    await dialog.accept(prompt);
  });

  await page.locator('#promptBtn').click();
  // Validate the result text 
  await expect(page.locator('#demo')).toContainText(prompt);
  
});

test('windowHandle', async ({ page }) => {
  await page.goto(baseURL);
  await page.locator("button[onclick='myFunction()']").click();
  await page.waitForTimeout(2000);
  await page.bringToFront(); // Brings child window to focus
  await expect(page).toHaveTitle('Automation Testing Practice');
});


test('upload a file and screenshot', async ({ page }) => {
  await page.goto(baseURL);

  // Locate the file input
  const fileInput = await page.locator('#singleFileInput');

  // Upload a file
  await fileInput.setInputFiles('./src/data/ContactData.csv');
  // Validate the file name
  await page.screenshot({ path: './src/data/screenshot.png', fullPage: true });
});
});

