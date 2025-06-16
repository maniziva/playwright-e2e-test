import { test, expect } from "@playwright/test";

test("Infinite Scroll Demo - Scroll Until End of Content", async ({ page }) => {
  await page.goto("https://infinite-scroll.com/demo/full-page/");

  const endMessageLocator = page.locator("text=End of content").first();
  const maxScrolls = 30;
  let previousHeight = 0;

  for (let i = 0; i < maxScrolls; i++) {
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1500); // allow time for loading

    if (await endMessageLocator.isVisible()) {
      console.log("✅ End of content message is visible.");
      break;
    }

    // Prevent infinite loop (check scroll height stops growing)
    const currentHeight = await page.evaluate(() => document.body.scrollHeight);
    if (currentHeight === previousHeight) {
      console.warn(
        "⚠️ Page height did not increase. Possibly reached the end."
      );
      break;
    }

    previousHeight = currentHeight;
  }

  // Final Assertion
  await expect(endMessageLocator).toBeVisible();
});
