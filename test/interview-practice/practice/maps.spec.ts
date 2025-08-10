import { expect, Locator, test } from "@playwright/test";
import * as fs from 'fs';

test("maps", async ({ page }) => {
  await page.goto("https://maps.google.com/");
  await expect(page).toHaveTitle('Google Maps');
  const place: string = "Chennai"
  
  await page.locator('input#searchboxinput').fill(place);
  await page.locator('button#searchbox-searchbutton').click();
  const expTitle = await page.title();
  await expect(expTitle).toContain(place);

  await expect(page).toHaveURL(`.*${place}.*`);
});
