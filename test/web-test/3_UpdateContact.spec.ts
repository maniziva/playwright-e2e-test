import { test, expect } from '@playwright/test';
const baseURL = process.env.BASEURL;

test('Update contact', async ({ page }) => {
    await page.goto(baseURL + "contactList");
    await page.getByRole('heading', { name: 'Contact List' }).click();
    // Update Contact
    await page.locator('//*[@id="myTable"]/tr[1]').click();
    await page.getByRole('button', { name: 'Edit Contact' }).click();
    await page.getByLabel('First Name:').fill('Manikandan-Updated');
    await page.getByLabel('Last Name:').fill('Adaikalam-Updated');
    await page.getByLabel('Country:').click();
    await page.getByLabel('Country:').fill('SriLanka');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('button', { name: 'Return to Contact List' }).click();
});