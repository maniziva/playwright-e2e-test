import { test } from '@playwright/test';
import * as XLSX from 'xlsx';

// 1️⃣ Read Excel file
const workbook = XLSX.readFile('src/data/Excel1.xlsx');

// 2️⃣ Select sheet and convert to JSON
const worksheet = workbook.Sheets['testData'];
const excelData: any[] = XLSX.utils.sheet_to_json(worksheet);

// 3️⃣ Data-driven Playwright test
for (const data of excelData) {
  test(`Login test - ${data.username}`, async ({ page }) => {
    await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
    await page.locator('#email').fill(data.username);
    await page.locator('#password').fill(data.password);
    await page.locator('#submit').click();
    await page.waitForLoadState('networkidle');

    // Optional assert:
    // await expect(page).toHaveURL(/dashboard|contacts|home/);
  });
}