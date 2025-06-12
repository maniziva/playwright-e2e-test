import {chromium, expect, test} from '@playwright/test';

test.describe('thinkapp test', ()=>{
    test('Browser context check', async() => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('https://thinking-tester-contact-list.herokuapp.com/login');
        await page.locator('#email').fill('route@gmail.com');
        await page.locator('#password').fill('Info@1234');
        await page.locator('#submit').click();
        await page.waitForLoadState('networkidle');
        
        // const title = await page.title();
        // await expect(title).toBe('My Contacts');
        // Add Contact
        
        await page.getByRole('button', { name: 'Add a New Contact' }).click();
        await page.getByPlaceholder('First Name').click();
        await page.getByPlaceholder('First Name').fill('1st Page');
        await page.getByPlaceholder('Last Name').click();
        await page.getByPlaceholder('Last Name').fill('Adaikalam');
        await page.getByPlaceholder('yyyy-MM-dd').click();
        await page.getByPlaceholder('yyyy-MM-dd').fill('1996-12-07');
        await page.getByPlaceholder('example@email.com').click();
        await page.getByPlaceholder('example@email.com').fill('manizivamsd@gmail.com');
        await page.getByPlaceholder('8005551234').click();
        await page.getByPlaceholder('8005551234').fill('8098606357');
        await page.getByPlaceholder('Address 1').click();
        await page.getByPlaceholder('Address 1').fill('434, Pudumanai 1st street');
        await page.getByPlaceholder('Address 2').click();
        await page.getByPlaceholder('Address 2').fill('Rayavaram');
        await page.getByPlaceholder('City').click();
        await page.getByPlaceholder('City').fill('Pudukkottai');
        await page.getByPlaceholder('State or Province').click();
        await page.getByPlaceholder('State or Province').fill('Tamilnadu');
        await page.getByPlaceholder('Postal Code').click();
        await page.getByPlaceholder('Postal Code').fill('622506');
        await page.getByPlaceholder('Country').click();
        await page.getByPlaceholder('Country').fill('India');
        await page.getByRole('button', { name: 'Submit' }).click();
        await page.waitForLoadState('networkidle');


        const page2 = await context.newPage();
        await page2.goto('https://thinking-tester-contact-list.herokuapp.com/contactList');
        await page2.getByRole('button', { name: 'Add a New Contact' }).click();
        await page2.getByPlaceholder('First Name').click();
        await page2.getByPlaceholder('First Name').fill('2nd Page');
        await page2.getByPlaceholder('Last Name').click();
        await page2.getByPlaceholder('Last Name').fill('Adaikalam');
        await page2.getByPlaceholder('yyyy-MM-dd').click();
        await page2.getByPlaceholder('yyyy-MM-dd').fill('1996-12-07');
        await page2.getByPlaceholder('example@email.com').click();
        await page2.getByPlaceholder('example@email.com').fill('manizivamsd@gmail.com');
        await page2.getByPlaceholder('8005551234').click();
        await page2.getByPlaceholder('8005551234').fill('8098606357');
        await page2.getByPlaceholder('Address 1').click();
        await page2.getByPlaceholder('Address 1').fill('434, Pudumanai 1st street');
        await page2.getByPlaceholder('Address 2').click();
        await page2.getByPlaceholder('Address 2').fill('Rayavaram');
        await page2.getByPlaceholder('City').click();
        await page2.getByPlaceholder('City').fill('Pudukkottai');
        await page2.getByPlaceholder('State or Province').click();
        await page2.getByPlaceholder('State or Province').fill('Tamilnadu');
        await page2.getByPlaceholder('Postal Code').click();
        await page2.getByPlaceholder('Postal Code').fill('622506');
        await page2.getByPlaceholder('Country').click();
        await page2.getByPlaceholder('Country').fill('India');
        await page2.getByRole('button', { name: 'Submit' }).click();
        await page2.waitForLoadState('networkidle');


        await page.locator('//*[@id="myTable"]/tr[1]').click();
        await page.getByRole('button', { name: 'Edit Contact' }).click();
        await page.getByLabel('First Name:').fill('1st page update');
        await page.getByLabel('Last Name:').fill('Adaikalam-Updated');
        await page.getByLabel('Country:').click();
        await page.getByLabel('Country:').fill('SriLanka');
        await page.getByRole('button', { name: 'Submit' }).click();
        await page.getByRole('button', { name: 'Return to Contact List' }).click();
    
        await page2.locator('//*[@id="myTable"]/tr[1]').click();
        await page2.getByRole('button', { name: 'Edit Contact' }).click();
        await page2.getByLabel('First Name:').fill('2nd page update');
        await page2.getByLabel('Last Name:').fill('Adaikalam-Updated');
        await page2.getByLabel('Country:').click();
        await page2.getByLabel('Country:').fill('SriLanka');
        await page2.getByRole('button', { name: 'Submit' }).click();
        await page2.getByRole('button', { name: 'Return to Contact List' }).click();
    
    });
});