import {expect, Locator, selectors, test} from '@playwright/test';
import { Console } from 'console';
import exp from 'constants';

test('Multi dropdown', async({page})=>{
  await page.goto('https://testautomationpractice.blogspot.com/')

  const drop = page.locator('#animals');
  const values = await drop.evaluate((select) =>{
    return [...(select as HTMLSelectElement).options].map((options) => options.value);
  })
  console.table(values);

  await drop.selectOption([{value: 'cheetah'},{value:'deer'}]);
  await drop.scrollIntoViewIfNeeded();

  const selectedValues = await drop.evaluate((select) =>{
    return [...(select as HTMLSelectElement).selectedOptions].map((options) => options.value);
  });
  console.table(selectedValues);
  await expect(selectedValues).toEqual(['cheetah','deer']);
})