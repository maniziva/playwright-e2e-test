import { expect, test } from "@playwright/test";

test("New Tab", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://testautomationpractice.blogspot.com/");
  await expect(page).toHaveTitle("Automation Testing Practice");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    page.getByRole("button", { name: "New Tab" }).click(),
  ]);

  await expect(newPage).toHaveTitle("SDET-QA Blog");
});
