import { test, expect } from "@playwright/test";
import exp from "constants";
import { readFileSync, writeFileSync } from "fs";
import fs from "fs";

const baseURL = process.env.BASEURL;
if (!baseURL) {
  throw new Error("BASEURL environment variable is not defined");
}
const username = process.env.MAILID as string;
if (!username) {
  throw new Error("MAILID environment variable is not defined");
}
const password = process.env.PASSWORD;
if (!password) {
  throw new Error("PASSWORD environment variable is not defined");
}

test.only("Get contact", async ({ page }) => {
  // Goto Base URL
  await page.goto(baseURL);
  // Input Login
  await page.locator("input#email").fill(username);
  await page.locator("input#password").fill(password);
  await page.getByRole("button", { name: "Submit" }).click();
  // Goto Home Page
  await page.getByRole("heading", { name: "Contact List" }).click();
  await page.waitForLoadState("networkidle");
  const row = page.locator('//table[@id="myTable"]/tr');
  const rowCount = await row.count();
  console.log(rowCount);

  const tabledata = [];

  for (let i = 1; i < rowCount; i++) {
    const rows = row.nth(i);
    // const name = await rows.locator('td').nth(1).textContent();
    // const birthdate = await rows.locator('td').nth(2).textContent();
    tabledata.push({
      Name: (await rows.locator("td").nth(1).textContent())?.trim(),
      Birthdate: (await rows.locator("td").nth(2).textContent())?.trim(),
    });
  }
  console.log(tabledata);
  // fs.writeFileSync('src/download/contact.json', JSON.stringify(tabledata, null, 2));

  // const expectedData = fs.readFileSync('src/download/contact.json','utf-8');
  // expect(expectedData).toEqual(JSON.stringify(tabledata, null, 2));
  const expectedRow = { Name: "John Doe", Birthdate: "1970-01-01" };

  // Assert that the table contains the expected row
  expect(tabledata).toContainEqual(expectedRow);
});
