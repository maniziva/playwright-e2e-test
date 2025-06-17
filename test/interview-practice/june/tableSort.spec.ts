import { test, expect } from '@playwright/test';

test('Validate table sorting using JSON comparison', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

  const tableRows = page.locator('table[name="courses"] tbody tr');
  const rowCount = await tableRows.count();

  const tableData = [];

  // Extract each row into a JSON object
  for (let i = 1; i < rowCount; i++) { // Skip header row at index 0
    const row = tableRows.nth(i);
    const instructor = await row.locator('td:nth-child(1)').innerText();
    const course = await row.locator('td:nth-child(2)').innerText();
    const price = parseFloat((await row.locator('td:nth-child(3)').innerText()).trim());

    tableData.push({
      Instructor: instructor.trim(),
      Course: course.trim(),
      Price: price,
    });
  }

  console.log('Extracted Table Data:', tableData);

  // Extract Price column and sort it
  const actualPrices = tableData.map(row => row.Price);
  const expectedPrices = [...actualPrices].sort((a, b) => a - b);

  expect(actualPrices).toEqual(expectedPrices);
  
  console.log(expectedPrices);
});