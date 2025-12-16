//import { expect, test } from "@playwright/test";
import { test } from "@fixtures/test-helpers-fixtures";
import { expect } from "@playwright/test";
import { log } from "console";
import exp from "constants";

const baseURL = "https://testautomationpractice.blogspot.com/";

test.describe.parallel("Practice - Web", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
  });
  test("1.Find Vowels from Title", async ({ page }) => {
    const title = await page.title();
    console.log(title);
    const vowel = title.match(/[aeiou]/gi);
    console.log(`Vowels of ${title} is: ${vowel}`);
  });

    test("2.Print sum of digits", async ({ page }) => {
    const err: string[] = await page.locator('div#broken-links a').nth(2).allTextContents();
    console.log(err);

    const digit = err.toString().match(/[\d]/gi);
    console.log(digit);
    
    const sum = digit.reduce((a,b)=> a+parseInt(b), 0);
    console.log(sum);
  });

});