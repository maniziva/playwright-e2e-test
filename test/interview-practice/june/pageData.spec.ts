import { test, expect } from '@playwright/test';

test('Extract table data from each page', async ({ page }) => {
  await page.goto('https://letcode.in/advancedtable');

  const allData: string[][] = [];

  while (true) {
    // Wait for the table to be loaded
    await page.waitForSelector('table[id="advancedtable"]');

    const rows = page.locator('table.advancedtable > tbody > tr');
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const cells = row.locator('td');
      const cellCount = await cells.count();
      const rowData: string[] = [];

      for (let j = 0; j < cellCount; j++) {
        rowData.push((await cells.nth(j).innerText()).trim());
      }

      allData.push(rowData);
    }

    // Check if the "Next" button is disabled
    const nextButton = page.locator('button[aria-label="Next"]');
    const isDisabled = await nextButton.getAttribute('disabled');
   // if (isDisabled !== null) break;

    if (isDisabled !== null) break;
    await nextButton.click();
    await page.waitForTimeout(500); // Give time for the next page to load
  }

  console.log('Extracted Table Data:');
  console.log(allData);
});