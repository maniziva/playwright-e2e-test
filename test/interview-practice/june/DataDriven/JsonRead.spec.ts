import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test.describe.skip('Read and Write data from external file', ()=> {
    test('Json Read and Write', async({page})=>{
        const UserData = JSON.parse(fs.readFileSync('src/data/DataDriven/UserData.json', 'utf-8'));
        //console.log(UserData[0].username);
        await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
        await page.locator('#email').fill(UserData[1].username);
        await page.locator('#password').fill(UserData[1].password);
        await page.locator('#submit').click();
        await expect(page.locator('header h1')).toBeVisible({timeout: 5000});
        
        const table = page.locator('table#myTable');
        await expect(table).toBeVisible({timeout: 10000});

        const tableRow = await table.locator('tr');
        const RowCount = await tableRow.count();

        const tableData : {Name: string, BirthDate: string} [] = [];
        for(let i=1; i<RowCount; i++){
            const row = tableRow.nth(i);
            const name = await row.locator('td').nth(1).innerText();
            const birthdate = await row.locator('td').nth(2).innerText();

            tableData.push({
                Name: name,
                BirthDate: birthdate
            })
        }
        console.table(tableData);

        fs.writeFileSync('src/data/DataDriven/tabledata.json', JSON.stringify(tableData, null, 2));
    })
})