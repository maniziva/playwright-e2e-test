import { expect, Locator, test } from "@playwright/test";
import * as fs from 'fs';

test("table", async ({ page }) => {
  await page.goto("https://cosmocode.io/automation-practice-webtable/");

  const tableRow = await page.locator('table#countries tbody tr');
  const count = await tableRow.count();
  console.log(count);
  //await page.evaluate(()=> window.scrollTo(0, document.body.scrollHeight));

  let tableData: {Visited: boolean, Country: string, Capital: string, Currency: string, Language: string}[] =[];
  for(let i=1; i < count; i++){
    const row = await tableRow.nth(i)
    const visited = await row.locator('td input').isChecked();
    const country = await row.locator('td').nth(1).innerText();
    const capital = await row.locator('td').nth(2).innerText();
    const currency = await row.locator('td').nth(3).innerText();
    const language = await row.locator('td').nth(4).innerText();
    tableData.push({
      Visited: visited,
      Country: country,
      Capital: capital,
      Currency: currency,
      Language: language
    })
    console.table(tableData);
    fs.writeFileSync('src/download/tabledata.json', JSON.stringify(tableData, null, 2));
    
  }
});
