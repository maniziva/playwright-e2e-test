import { expect, Locator, test } from "@playwright/test";
import * as fs from 'fs';

test("maps", async ({ page }) => {
  await page.goto("https://ultimateqa.com/simple-html-elements-for-automation/");
  await expect(page).toHaveTitle('Simple HTML Elements For Automation - Ultimate QA');
const dropdown = await page.locator('div select');

const values = await dropdown.evaluate((select) =>{
    return [...(select as HTMLSelectElement).options].map((option) => option.text);
})
console.log(values);

await dropdown.selectOption({label: 'Saab'});
const selectedValues = await dropdown.evaluate((select) =>{
    return [...(select as HTMLSelectElement).selectedOptions].map((option) => option.text);
})
console.log(selectedValues);

await expect(selectedValues).toEqual(['Saab']);
});
