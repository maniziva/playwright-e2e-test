//import { expect, test } from "@playwright/test";
import { test } from "@fixtures/test-helpers-fixtures";
import { expect } from "@playwright/test";
import exp from "constants";

const baseURL = "https://testautomationpractice.blogspot.com/";

test.describe.parallel("Practice - Web", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
  });
  test("1.Check title", async ({ page }) => {
    await expect(page).toHaveTitle("Automation Testing Practice");
  });
  test("2.Check Input text", async ({ page }) => {
    const nameInput = page.getByPlaceholder("Enter Name");
    await nameInput.fill("Manikandan");
    await expect(nameInput).toHaveValue("Manikandan");
  });
  test("3.Assert Radio", async ({ page }) => {
    const maleRadio = page.locator('input[value="male"]');
    await maleRadio.check();
    await expect(maleRadio).toBeChecked();
  });
  test("4.Assert Checkbox", async ({ page }) => {
    const tuesday = page.locator('input[value="tuesday"]');
    await tuesday.check();
    await expect(tuesday).toBeChecked();
  });
  test("5.Assert Dropdown", async ({ page }) => {
    const country = page.locator('select[id="country"]');
    await country.selectOption("canada");
    await expect(country).toContainText("Canada");
  });
  test("6.File upload", async ({ page }) => {
    const singleFileInput = page.locator('input[id="singleFileInput"]');
    await singleFileInput.click();
    await singleFileInput.setInputFiles("./src/data/UserData.json");

    const multipleFilesInput = page.locator('input[id="multipleFilesInput"]');
    await multipleFilesInput.click();
    await multipleFilesInput.setInputFiles([
      "./src/data/UserData.json",
      "./src/data/tableData.json",
    ]);
  });
  test("7.Screenshot", async ({ page }) => {
    await page.screenshot({
      path: "./src/download/screenshot.jpg",
      fullPage: true,
    });
    const singleFileInput = page.locator('input[id="singleFileInput"]');
    await singleFileInput.screenshot({ path: "./src/download/screenshot.png" });
  });
  test("8.Drag and drop", async ({ page }) => {
    await page.dragAndDrop('div[id="draggable"]', 'div[id="droppable"]');
    await page
      .locator('div[id="droppable"]')
      .screenshot({ path: "./src/download/dragAndDrop.png" });
  });
  test("9.Visual Testing", async ({ page }) => {
    //await expect(page.locator('div[id="droppable"]')).toHaveScreenshot();
    await expect(page).toHaveScreenshot({
      fullPage: true,
      threshold: 0.5,
      mask: [
        page.locator("#HTML12"),
        page.locator(".section-columns"),
        page.locator("#Stats1_content"),
      ],
    });
  });
  test("10. Assertions", async ({ page }) => {
    //Auto retry assertions
    //Assertions
    // await expect(page).toHaveTitle('title');
    // await expect(page).toHaveURL(/regex/);
    // await expect(locator).toHaveText('text');
    // await expect(locator).toHaveValue('value');
    // await expect(locator).toBeVisible();
    // await expect(locator).toBeHidden();"
    // //Non-Auto retry Assertions
    // const val = await page.locator('h1').textContent(); // .innerText();
    // expect(val).toBe('Welcome');
    // const json = await response.json();
    // expect(json.status).toBe('success');
  });
  test("11. Frames", async ({ page }) => {
    await page.goto("https://demo.automationtesting.in/Frames.html");
    const frame1 = page.frame({ name: "SingleFrame" });
    await frame1.locator('input[type="text"]').fill("Manikandan");
  });
  test("12. Get dropdown Values", async ({ page }) => {
    const dropdown = page.locator("#country");
    const values = await dropdown.evaluate((select) => {
      return [...(select as HTMLSelectElement).options].map(
        (option) => option.text
      );
    });
    console.log(values);
  });

    test("12. Get slected dropdown Values", async ({ page }) => {
    const dropdown = page.locator("#country");
    await dropdown.selectOption("canada");
    const values = await dropdown.evaluate((select) => {
      return [...(select as HTMLSelectElement).selectedOptions].map(
        (option) => option.text
      );
    });
    console.log(values);
  });
});
