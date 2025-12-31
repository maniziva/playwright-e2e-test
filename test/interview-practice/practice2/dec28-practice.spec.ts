import { Browser, chromium, expect, firefox, test, webkit } from "playwright/test";

test.describe("Dec-28 Test suite", async () => {
  const baseURL = "https://testautomationpractice.blogspot.com/";

  test.beforeEach("Before", async ({ page }) => {
    await page.goto(baseURL);
  });
  test("Table data", async ({ page }) => {
    const table = page.locator('table[name="BookTable"] tr');
    const count = await table.count();
    console.log(count);

    const tableData: {Name: string, Author: string, Subject: string, Price: string}[] = [];

    for(let i=1; i<count; i++){
        const Row = await table.nth(i);
        const name = await Row.locator('td').nth(0).innerText();
        const author = await Row.locator('td').nth(1).innerText();
        const subject = await Row.locator('td').nth(2).innerText();
        const price = await Row.locator('td').nth(3).innerText();

        tableData.push({
            Name: name,
            Author: author,
            Subject: subject,
            Price: price
        });
    }
    console.table(tableData);
  });
});