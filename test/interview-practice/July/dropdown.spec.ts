import {expect, Locator, test} from '@playwright/test';

test.skip('dropdown', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle('Automation Testing Practice');
    
    const multi = page.locator('#colors');
    await multi.selectOption([{ value: 'red' }, { value: 'blue' }]);
    //await multi.screenshot({ path: 'src/download/multi.png' })
    
    const selectedValues = await multi.evaluate((select) => {
      return [...(select as HTMLSelectElement).selectedOptions].map(option => option.value);
    });
    
    console.log(selectedValues);
})