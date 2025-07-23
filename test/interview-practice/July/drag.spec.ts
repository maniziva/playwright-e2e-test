import { test } from "@playwright/test";

test("Drag and drop", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  const drag = page.locator("#droppable");
  await page.dragAndDrop("#draggable", "#droppable");

  await drag.screenshot({ path: "src/download/dragdrop.png" });
});
