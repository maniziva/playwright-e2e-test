import {expect, test} from '@playwright/test';
import { HomePage } from '@pages/Common/testautomationpractice/HomePage.page';

test('POM check', async({page})=>{
    const homepage = new HomePage(page);
    await page.goto('https://testautomationpractice.blogspot.com/');
    await homepage.name.fill('Manikandan');
    await homepage.gender.click();
    await homepage.days.click();
    
    const CountryValues = await homepage.getDropdownValues('#country');
    console.table(CountryValues);
    const ColorsValues = await homepage.getDropdownValues('#colors');
    console.table(ColorsValues);
});