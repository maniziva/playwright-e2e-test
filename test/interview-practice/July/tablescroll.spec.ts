import { test, expect } from "@playwright/test";
import * as fs from "fs";

test.skip("table scroll", async ({ page }) => {
  await page.goto("https://infinite-scroll.com/demo/full-page/");

  let maxscrolls: number = 100;
  let previousHeight: number = 0;

  for (let i = 0; i < maxscrolls; i++) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);

    const currentHeight = await page.evaluate(() => document.body.scrollHeight);
    if (currentHeight === previousHeight) {
      console.log("Page is at the end");
      break;
    }
    previousHeight = currentHeight;
  }

  const row = await page.locator(".article");
  const rowCount = await row.count();
  const tableData: { Name: string }[] = [];
  for (let i = 0; i < rowCount; i++) {
    const header = await row.nth(i);
    const name = await header.locator("h2").innerText();
    tableData.push({
      Name: name,
    });
  }
  console.table(tableData);
  //fs.writeFileSync('src/download/scrolltable.json', JSON.stringify(tableData, null, 2));

  // const jsonData = fs.readFileSync('src/download/scrolltable.json', 'utf-8');
  // console.log(jsonData);
  // await expect(tableData).toEqual(JSON.parse(jsonData));
});
