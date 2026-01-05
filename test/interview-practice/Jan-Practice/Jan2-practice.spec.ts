import { expect, request, test } from "playwright/test";
import * as fs from "fs";

test.describe("Jan2 Test suite", async () => {
  const baseURL = "https://testautomationpractice.blogspot.com/p/download-files_25.html";

  test.beforeEach("Before", async ({ page }) => {
    await page.goto(baseURL);
  });

  test("Download", async ({ page }) => {
    await page.locator('textarea[id="inputText"]').fill('check');
    await page.getByRole('button', {name: 'Generate and Download Text File'}).click();

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('link', {name: 'Download Text File'}).click(),
    ]);

    await download.saveAs('src/download/jan1.txt');
    const jan1Data = fs.readFileSync('src/download/jan1.txt','utf-8');
    console.log(jan1Data);
  });
});
