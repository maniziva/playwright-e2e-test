import {expect, Locator, test} from '@playwright/test';
import { Console } from 'console';
import exp from 'constants';

test.skip('dropdown', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle('Automation Testing Practice');
    
    const multi = page.locator('#colors');c

    const values = await multi.evaluate((select) => {
      return [...(select as HTMLSelectElement).options].map(option => option.value);
    });
    console.table(values);

    await multi.selectOption([{ value: 'red' }, { value: 'blue' }]);
    await multi.scrollIntoViewIfNeeded();
    
    const selectedValues = await multi.evaluate((select) => {
      return [...(select as HTMLSelectElement).selectedOptions].map(option => option.value);
    });
    console.log(selectedValues);
    expect(selectedValues).toEqual(['red', 'blue']);
})

test('single dropdown', async({page}) =>{
  await page.goto('https://testautomationpractice.blogspot.com/');
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveTitle('Automation Testing Practice');

  const drop = await page.getByRole('combobox', {name: 'Country'})
  await drop.selectOption({value: 'canada'});
  const selected = await drop.inputValue();
  //console.log(selected);
  //await expect(selected).toBe('canada');
  await expect(drop).toHaveValue('canada');
})