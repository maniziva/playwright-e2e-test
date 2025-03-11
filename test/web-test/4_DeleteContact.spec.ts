import { test, expect } from '@playwright/test';
const baseURL = process.env.BASEURL;

test('test', async ({ page }) => {
    await page.goto(baseURL + "contactList");

    await page.getByRole('heading', { name: 'Contact List' }).click();
    // Delete Contact
    await page.getByRole('cell', { name: 'Manikandan Adaikalam' }).nth(0).click();

    await page.getByRole('button', { name: 'Delete Contact' }).click();
    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.accept().catch(() => {});
    });

    // Logout and Goto LoginPage
    // await page.getByRole('button', { name: 'Logout' }).click();
    // await page.getByRole('heading', { name: 'Contact List App' }).click();
});