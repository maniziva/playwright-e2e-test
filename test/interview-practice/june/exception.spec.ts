import { test, expect } from "@playwright/test";

test("Timeout Exception", async ({ page }) => {
  await page.goto("https://thinking-tester-contact-list.herokuapp.com/");
  // Will throw TimeoutError if button not found in 5 seconds
  await page.locator("#nonExistingButton").click();
});

test("Element detached from DOM", async ({ page }) => {
  await page.goto("https://thinking-tester-contact-list.herokuapp.com/");

  const handle = await page.locator('#myButton').elementHandle();
  await page.reload(); // or DOM changes
  await handle.click(); // This will throw!
});

test("NavigationError example", async ({ page }) => {
  await page.goto("https://invalid-url.example.com", { timeout: 10000 });
});

test("AssertionError example", async ({ page }) => {
  await page.goto("https://thinking-tester-contact-list.herokuapp.com/");

  const heading = page.locator("h1");

  // Throws AssertionError if text does not match
   expect(heading).toHaveText("Incorrect Text");
});


test("NetworkError", async ({ request }) => {
    const response = await request.get('https://invalid.api');
    await expect(response.ok()).toBeTruthy();
  });