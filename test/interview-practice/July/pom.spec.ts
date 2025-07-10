import {expect, test} from '@playwright/test';
import { HomePage } from '@pages/Common/testautomationpractice/HomePage.page';

test.only('POM check', async({page})=>{
    const homepage = new HomePage(page);
    await page.goto('https://testautomationpractice.blogspot.com/');
    await homepage.name.fill('Manikandan');
    await homepage.gender.click();
    await homepage.days.click();
    await homepage.getDropdownValues();
});