//How to use google maps in playwright?

import { test, expect } from '@playwright/test';

test('Assert location via URL', async ({ page }) => {
await page.goto('https://www.google.com/maps');

// Search for Chennai
  const searchInput = page.locator('//input[@id="searchboxinput"]');
  await searchInput.fill('Chennai');
  await page.keyboard.press('Enter');

  // Wait for navigation to update
  await page.waitForTimeout(5000);

  const title = await page.title();
  expect(title).toContain('Chennai');

  const currentUrl = page.url();
  console.log('Google Maps URL:', currentUrl);

  // Assert that URL contains the expected location
  expect(currentUrl).toContain('Chennai');

  expect(currentUrl).toMatch(/.*place.*Chennai.*Tamil.*Nadu.*13.*80.*11z/);

  // Screenshot a specific area (e.g., map container or full page)
// const mapElement = page.locator('.id-content-container'); // Google Maps often uses a canvas element for rendering the map
//   await expect(mapElement).toHaveScreenshot('chennai-map.png', {
//     threshold: 0.9, });
});