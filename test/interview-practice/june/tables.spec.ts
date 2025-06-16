import { test } from '@playwright/test';

test('Grab table contetnts', async({page}) =>{
    await page.goto('https://thinking-tester-contact-list.herokuapp.com/login');
    await page.locator('#email').fill('master@gmail.com');
    await page.locator('#password').fill('Info@1234');
    await page.locator('#submit').click();
    await page.waitForLoadState('networkidle');

    const tableRow = await page.locator('table[id="myTable"] tr');
    const rowCount = await tableRow.count();
    console.log(rowCount);

    const tabledata : {Name: string, Email: string, Phone: string, Country: string}[] = [];
    for(let i =1; i<rowCount; i++){
        const row = tableRow.nth(i);
        const name = await row.locator('td').nth(1).innerText();
        const email = await row.locator('td').nth(3).innerText();
        const phone = await row.locator('td').nth(4).innerText();
        const country = await row.locator('td').nth(7).innerText();

        tabledata.push({
            Name : name,
            Email : email,
            Phone : phone,
            Country : country
        });
    }
    console.table(tabledata);
});