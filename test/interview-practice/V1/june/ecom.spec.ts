import { expect, test } from '@playwright/test';
import * as fs from 'fs';
test.skip('Grab book contetnts', async({page}) =>{ 
    await page.goto('https://demoqa.com/books');
    const tableRow = page.locator('div[class = "rt-table"] div[class="rt-tr-group"]');
    const rowCount = await tableRow.count();
    console.log('Number of Rows:',rowCount);

    const tableData :{Title: string, Author: string, Publisher: string}[] = [];
    for(let i=0; i<rowCount-2; i++){
        const row = tableRow.nth(i);
        const title = await row.locator('div[class = "rt-td"]').nth(1).innerText();
        const author = await row.locator('div[class = "rt-td"]').nth(2).innerText();
        const publisher = await row.locator('div[class = "rt-td"]').nth(3).innerText();

        tableData.push({
            Title: title,
            Author: author,
            Publisher: publisher
        });

    }
    console.table(tableData);
});

test('Grab ecom contents', async({page}) =>{
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page).toHaveTitle('Swag Labs');
    const invItem = page.locator('div[class="inventory_list"] div[class="inventory_item"]');
    const invItemCount = await invItem.count();
    console.log('Number of inventory items',invItemCount);

    const itemData : {Title: string, Price: string} [] = [];

    for(let i=0; i<invItemCount; i++){
        const row = invItem.nth(i);
        const title = await row.locator('div[class="inventory_item_name "]').innerText();
        const price = await row.locator('div[class="inventory_item_price"]').innerText();

        itemData.push({
            Title: title, Price: price
        });
    }
    console.table(itemData);
    // const jsonData = JSON.stringify(itemData);
    fs.writeFileSync('src/data/ecomInvData.json', JSON.stringify(itemData, null, 2))
});