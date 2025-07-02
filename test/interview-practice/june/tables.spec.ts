import { test, Locator } from '@playwright/test';

test('Grab table contents', async ({ page }) => {
    await page.goto('https://thinking-tester-contact-list.herokuapp.com/login');
    await page.locator('#email').fill('master@gmail.com');
    await page.locator('#password').fill('Info@1234');
    await page.locator('#submit').click();
    await page.waitForLoadState('networkidle');

    const tableRow: Locator = page.locator('table[id="myTable"] tr');
    const rowCount: number = await tableRow.count();
    console.log(rowCount);

    const tabledata: { Name: string; Email: string; Phone: string; Country: string }[] = [];
    for (let i = 1; i < rowCount; i++) {
        const row: Locator = tableRow.nth(i);
        const name: string = await row.locator('td').nth(1).innerText();
        const email: string = await row.locator('td').nth(3).innerText();
        const phone: string = await row.locator('td').nth(4).innerText();
        const country: string = await row.locator('td').nth(7).innerText();

        tabledata.push({
            Name: name,
            Email: email,
            Phone: phone,
            Country: country,
        });
    }
    console.table(tabledata);
});