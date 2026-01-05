import { expect, request, test } from "playwright/test";
import * as fs from "fs";

test.describe("Jan5 Test suite", async () => {
  const baseURL = "https://www.flipkart.com/";

  test.beforeEach("Before", async ({ page }) => {
    await page.goto(baseURL);
  });

  test("Get Flipkart data", async ({ page }) => {
    await page.getByPlaceholder('Search for Products, Brands and More').fill('PS5');
    await page.keyboard.press("Enter");

    await page.waitForLoadState('networkidle');

    const products = await page.locator('//div[@data-id]');
    const count = await products.count();
    console.log(count);

    const tableData : {Name: String, Price: number }[] = [];
    for(let i =0; i<count; i++){
        const product = await products.nth(i);
        const name = await product.locator('//div/a[@title]').innerText();
        const price = await product.locator("//div[contains(text(),'₹')]").first().innerText();

        const priceNum = price.replace(/\D/gi,'');
        const priceValue = priceNum ? parseInt(priceNum, 10) : 0;

        tableData.push({
            Name: name,
            Price: priceValue
        });
    }
    console.table(tableData);
  });
});
