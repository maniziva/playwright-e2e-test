import { test, expect } from '@playwright/test';
const baseURL = process.env.BASEURL;

test('test', async ({ page }) => {
    await page.goto(baseURL + "contactList");

    await page.getByRole('heading', { name: 'Contact List' }).click();
    // Update Contact
    await page.getByRole('cell', { name: 'Manikandan Adaikalam' }).nth(0).click();
    await page.getByRole('button', { name: 'Edit Contact' }).click();
    await page.getByLabel('Country:').click();
    await page.getByLabel('Country:').fill('SriLanka');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('button', { name: 'Return to Contact List' }).click();

    // Logout and Goto LoginPage
    // await page.getByRole('button', { name: 'Logout' }).click();
    // await page.getByRole('heading', { name: 'Contact List App' }).click();
});