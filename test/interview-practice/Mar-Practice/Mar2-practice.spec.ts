import { expect, request, test } from "playwright/test";

test.describe("Mar2 Test suite", async () => {
  const baseURL = "https://www.princexml.com/samples/invoice-plain/index.pdf";

  test("PDF Validation", async ({ page }) => {
    await page.goto(baseURL);
    
  });
});