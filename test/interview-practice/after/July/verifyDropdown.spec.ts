import { test, expect, selectors } from '@playwright/test';
import exp from 'constants';

test('Validate country dropdown', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    await expect(page).toHaveTitle('Automation Testing Practice');
  
    const drop = page.locator('#country');
  
    const values = await drop.evaluate((select) => {
      return [...(select as HTMLSelectElement).options].map((opt) => opt.text);
    });
  
    console.log(`Number of options in country dropdown is ${values.length}`);
  
    const expectedCountries: string[] = ['United States', 'Canada'];
  
    for (const country of expectedCountries) {
      expect(values).toContain(country);
    }
  });