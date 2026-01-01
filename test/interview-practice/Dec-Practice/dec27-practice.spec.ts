import { Browser, chromium, expect, firefox, test, webkit } from "playwright/test";

test.describe("Dec-27 Test suite", async () => {
  const baseURL = "https://testautomationpractice.blogspot.com/";

  test.beforeEach("Before", async ({ page }) => {
    await page.goto(baseURL);
  });
  test("RegEx - URL", async ({ page }) => {
    await expect(page).toHaveTitle('Automation Testing Practice');
    await expect(page).toHaveURL(/.*testautomationpractice.*/);
  });
  test("Verify elements", async ({ page }) => {
    await page.locator('input[id="name"]').fill('Manikandan');
    await expect(page.locator('input[id="name"]')).toHaveValue('Manikandan');

    await page.locator('input[value="male"]').check();
    await expect(page.locator('input[value="male"]')).toBeChecked();
    await expect(page.locator('input[value="female"]')).not.toBeChecked();
});

});
