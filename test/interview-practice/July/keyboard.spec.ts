import {expect, test} from '@playwright/test';

test('Keyboard', async({page})=>{
  await page.goto('https://testautomationpractice.blogspot.com/')
    await page.locator('#name').focus();
    await page.keyboard.press('Tab');
    await page.keyboard.type('Hello');
    await page.keyboard.down('Shift');
    await page.keyboard.up('Shift');
});

test.skip('Visual', async({page})=>{
  await page.goto('https://testautomationpractice.blogspot.com/')
    ///const input = page.locator('#name');
    //await expect(input).toHaveScreenshot('input.png');
    await expect(page).toHaveScreenshot({
        //name: 'homepage-full.png',
        fullPage: true,
        mask: [
          page.locator('#HTML12'),
          page.locator('.section-columns'),
          page.locator('#Stats1_content')
        ]
      });
});