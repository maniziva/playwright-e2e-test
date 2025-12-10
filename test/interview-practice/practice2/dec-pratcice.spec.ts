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
    await multipleFilesInput.setInputFiles(["./src/data/UserData.json", "./src/data/tableData.json"]);
  });
  test("7.Screenshot", async ({ page }) => {
    await page.screenshot({path:"./src/download/screenshot.jpg",fullPage: true});
    const singleFileInput = page.locator('input[id="singleFileInput"]');
    await singleFileInput.screenshot({path: "./src/download/screenshot.png"})
  });
  test("8.Drag and drop", async ({ page }) => {
    await page.dragAndDrop('div[id="draggable"]', 'div[id="droppable"]');
    await page.locator('div[id="droppable"]').screenshot({path:"./src/download/dragAndDrop.png"})
  });
  test("9.Visual Testing", async ({ page }) => {
    //await expect(page.locator('div[id="droppable"]')).toHaveScreenshot();
    await expect(page).toHaveScreenshot({
      fullPage: true,
       threshold: 0.5, 
        mask: [
          page.locator('#HTML12'),
          page.locator('.section-columns'),
          page.locator('#Stats1_content')
        ]
      });
  });


});
