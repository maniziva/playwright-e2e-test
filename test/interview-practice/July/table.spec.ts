import {expect, Locator, test} from '@playwright/test';
import * as fs from 'fs';

test.skip('table', async({page})=>{
    await page.goto("https://thinking-tester-contact-list.herokuapp.com/");
    await page.locator("#email").fill('route@gmail.com');
    await page.locator("#password").fill('Info@1234');
    await page.locator("#submit").click();
    await page.waitForLoadState("networkidle");

    const tableRow: Locator = await page.locator('#myTable tr');
    const count: number = await tableRow.count();
    console.log(count);

    const tableData : {Name: string, BirthDate: string} [] = [];
    for(let i = 1; i < count; i++){
        const row = tableRow.nth(i);
        const name: string = await row.locator('td').nth(1).innerText();
        const birth: string = await row.locator('td').nth(2).innerText();
        tableData.push({
            Name : name,
            BirthDate: birth
        })
    }
    console.table(tableData);
    fs.writeFileSync('src/download/july.json', JSON.stringify(tableData, null, 2));
    const jsonData = JSON.parse(fs.readFileSync('src/download/july.json', 'utf-8'));
    //console.log(jsonData);
    //const birth = jsonData.filter((item) => item.Name === '2nd page update Adaikalam-Updated');
    for(const item of jsonData){
        console.table(item.BirthDate);
    }
});