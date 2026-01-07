import { test } from "@playwright/test";

test("Without fill", async ({ page }) => {
  await page.goto("https://thinking-tester-contact-list.herokuapp.com/");
  // Wait for the page to load and the form to be visible
  await page.locator("#email").type("route@gmail.com");
  // Fill in the form fields without using fill()
  await page.locator("#email").click(); // Click to focus
  await page.keyboard.type("master@gmail.com");
  // Alternatively, you can use evaluate to set the value directly
  await page.locator("#email").evaluate((el) => {
    (el as HTMLInputElement).value = "Manikandan";
  });
});
