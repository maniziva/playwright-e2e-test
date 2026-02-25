import { da } from "@faker-js/faker/.";
import exp from "constants";
import { expect, request, test } from "playwright/test";
import { title } from "process";

test.describe("Feb17 Test suite", async () => {
  const baseURL = "https://practicetestautomation.com/practice-test-login/";

  test.skip("Google search", async ({ page }) => {
    await page.goto("https://www.google.com/");
    await page.locator('//textarea[@title="Search"]').fill("Anthropic");

    const searchData = await page.locator('//ul[@role="listbox"]/li');
    await expect(searchData.first()).toBeVisible();
    const count = await searchData.count();
    console.log(count);

    const textData = await searchData.allInnerTexts();

    for (const char of textData) {
      console.log(char);
    }
  });
test.only("Flipkart search", async ({ page }) => {
    await page.goto("https://www.flipkart.com/");
    const textbox = await page.locator('//input[@name="q"]').first();
    await textbox.click();
    await textbox.fill('Iphone');


 // Wait for suggestion items (anchor elements)
  //const sugg = await page.waitForSelector('(//form[contains(@action,"search")]//a)[1]');
  const sugg = await page.locator('//ul/li/div/a');
  await expect(sugg.first()).toBeVisible();
  //await sugg.click();
  // Click first suggestion
  //await page.click('(//form[contains(@action,"search")]//a)[1]');
  // Verify navigation happened

  // console.log(await sugg.count());

  //await expect(page).toHaveURL(/search/);
const data = await sugg.allTextContents();
console.log(data);
  //   for(const char of sugg)
  // });


});
});