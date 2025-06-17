import { test, expect } from "@playwright/test";

test("Get all dropdown values", async ({ page }) => {
  await page.goto("https://letcode.in/dropdowns"); // Example dropdown page

  const dropdown = page.locator("#fruits"); // Adjust selector based on your app
  const options: string[] = await dropdown.locator("option").allTextContents();
  console.table(options);

  const dropdown2 = page.locator("#superheros"); // Adjust selector based on your app
  const options2: string[] = await dropdown2.locator("option").allTextContents();
  console.table(options2);
});
