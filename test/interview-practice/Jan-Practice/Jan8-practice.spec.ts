import { expect, request, test } from "playwright/test";

test.describe("Jan8 Test suite", async () => {
  const baseURL = "https://practice-automation.com/";

  test.beforeEach("Before", async ({ page }) => {
    await page.goto(baseURL);
  });

test('Window handle', async({page, context})=>{
    await page.goto('https://practice-automation.com/window-operations/');
    console.log(await page.title());

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.locator('button[onclick="newTab()"]').click()
    ]);

    const newPageTitle = await newPage.title();
    console.log(newPageTitle);

    await newPage.bringToFront();
    await page.bringToFront();
});

test('Download-Upload', async({page})=>{
  await page.goto('https://practice-automation.com/file-download/');
    //await page.locator('a[class="wpdm-download-link download-on-click btn btn-primary "]').click()
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('a[class="wpdm-download-link download-on-click btn btn-primary "]').click()
  ])
  await download.saveAs('src/download/test.pdf');

});

test('Simple Alert', async({page})=>{
    await page.goto('https://practice-automation.com/popups/');
    await page.locator('button[onclick="alertPopup()"]').click();
    await page.on('dialog', async dialog =>{
    await dialog.accept();
    });
});

test('Confirm Alert', async({page})=>{
    await page.goto('https://practice-automation.com/popups/');
    await page.locator('button[onclick="confirmPopup()"]').click();
    await page.on('dialog', async dialog =>{
    await dialog.dismiss();
    });
});

test('Prompt Alert', async({page})=>{
    await page.goto('https://practice-automation.com/popups/');
    await page.locator('button[onclick="promptPopup()"]').click();
    await page.on('dialog', async dialog =>{
    await dialog.accept('Check');
    });
});
});