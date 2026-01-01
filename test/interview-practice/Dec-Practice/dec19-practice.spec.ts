import { test } from 'playwright/test';

test.describe('Dec-19 Test Suite', async()=>{
    const baseURL = "https://testautomationpractice.blogspot.com/";

    test.beforeEach('Before', async({page})=>{
        await page.goto(baseURL);
    })
    test('Get Dropdown values', async({page})=>{
        const country = page.locator('select[id="country"]');
        const countryValues = await country.evaluate((select)=>{
            return [...(select as HTMLSelectElement).options].map(option => option.text);
        })
        console.log(countryValues);
        await country.selectOption({value: "usa"});

        const selectedValue = await country.evaluate((select)=>{
            return [...(select as HTMLSelectElement).selectedOptions].map(option => option.text);
        });
        console.log(selectedValue);
    });
});