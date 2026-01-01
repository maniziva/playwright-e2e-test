import { test } from "playwright/test";

test.describe("Dec-22 Test Suite", async () => {
  const baseURL = "https://testautomationpractice.blogspot.com/";

  test.beforeEach("Before", async ({ page }) => {
    await page.goto(baseURL);
  });
  test("1. Get Table values with pagination", async ({ page }) => {
    const pagination = page.locator('ul[id="pagination"] li');
    const pageCount = await pagination.count();
    console.log(pageCount);
    for (let i = 0; i < pageCount; i++) {
      const currentPage = await pagination.nth(i);
      await currentPage.locator("a").click();
      console.log(`Im in ${i + 1} page`);

      const tableRow = page.locator('table[id="productTable"] tbody tr');
      const rowCount = await tableRow.count();
      console.log(`Number of rows ${rowCount}`);

      const tableData: { ID: string; Name: string; Price: string }[] = [];
      for (let j = 0; j < rowCount; j++) {
        const currentRow = await tableRow.nth(j);
        const id = await currentRow.locator("td").nth(0).innerText();
        const name = await currentRow.locator("td").nth(1).innerText();
        const price = await currentRow.locator("td").nth(2).innerText();
        //const select = await currentRow.locator('td input').nth(4).isChecked();

        tableData.push({
          ID: id,
          Name: name,
          Price: price,
        });
      }
      console.table(tableData);
    }
  });
  test("2. Scroll and get data", async ({ page }) => {
    await page.goto("https://infinite-scroll.com/demo/full-page/");
    const articles = await page.locator('article[class="article"]');
    const aricleCount = await articles.count();
    console.log(aricleCount);

    let maxScrolls = 100;
    let previousHeight = 0;

    for (let i = 0; i < maxScrolls; i++) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1500); // allow time for loading

      const currentHeight = await page.evaluate(() => document.body.scrollHeight);
      if (currentHeight === previousHeight) {
        console.log('Height reached');
        break;
      }
      previousHeight = currentHeight;
    }
  });
});
