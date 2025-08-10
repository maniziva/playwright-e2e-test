import { test } from "@playwright/test";
import * as fs from "fs";

const Jsondata = JSON.parse(fs.readFileSync("src/data/UserData.json", "utf-8"));
//console.log(Jsondata);
for (const data of Jsondata) {
  test(`Read file data - ${data.username}`, async ({ page }) => {
    await page.goto("https://thinking-tester-contact-list.herokuapp.com/");
    await page.locator("#email").fill(data.username);
    await page.locator("#password").fill(data.password);
    await page.locator("#submit").click();
    await page.waitForLoadState("networkidle");
  });
}
