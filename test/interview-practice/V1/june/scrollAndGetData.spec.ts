import { test, expect } from '@playwright/test';

test('Infinite Scroll Demo - and grab title data', async ({ page }) => {
  await page.goto('https://infinite-scroll.com/demo/full-page/');

  const maxScrolls = 30;
  let previousHeight = 0;

  for (let i = 0; i < maxScrolls; i++) {
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1500); // allow time for loading

    // Prevent infinite loop (check scroll height stops growing)
    const currentHeight = await page.evaluate(() => document.body.scrollHeight);
    if (currentHeight === previousHeight) {
      console.warn('⚠️ Page height did not increase. Possibly reached the end.');
      break;
    }
    previousHeight = currentHeight;
  }

  const titleRow = page.locator('article[class="article"]');
  const titleRowCount = await titleRow.count();
  console.log(titleRowCount);

  const titleData : {Title: string} [] = [];
  for(let i=0; i<titleRowCount; i++){
    const currentTitle = titleRow.nth(i);
    const title = await currentTitle.locator('h2').innerText();
    titleData.push({
        Title : title
    });
  }
  console.table(titleData);
});

