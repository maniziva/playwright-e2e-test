//WebElemet - https://try.playwright.tech/?l=playwright-test&s=ogj2nnc

import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

const baseURL = "https://testautomationpractice.blogspot.com/";

test.describe("Playwright - WebElements", () => {
  test("Get title", async ({ page }) => {
    await page.goto(baseURL);
    console.log(await page.title());
  });

  test("has title", async ({ page }) => {
    await page.goto(baseURL);
    await expect(page).toHaveTitle(/Automation Testing Practice/);
  });

  test("Element - isVisible()", async ({ page }) => {
    await page.goto(baseURL);
    await page.locator(".name").isVisible();
  });

  test("Checkbox - Assertion", async ({ page }) => {
    await page.goto(baseURL);
    await page.locator("#sunday").check();
    await expect(page.locator("#sunday")).toBeChecked();
    await page.locator("#sunday").uncheck();
    await expect(page.locator("#sunday")).not.toBeChecked();
  });

  test("RadioButton - Assertion", async ({ page }) => {
    await page.goto(baseURL);
    const male = page.locator('input[value="male"]');
    await male.check();
    await expect(male).toBeChecked();
    const female = page.locator('input[value="female"]');
    await expect(female).not.toBeChecked();
  });

  test("InputBox - Assertion", async ({ page }) => {
    await page.goto(baseURL);
    const name = page.locator('input[id="field1"]');
    await expect(name).toHaveValue("Hello World!");
  });

  test("Select Dropdown", async ({ page }) => {
    await page.goto(baseURL);
    await page.selectOption('//*[@id="country"]', { value: "canada" });
  });

  test("getAllValuesFromDropdown and select 1st value", async ({
    page,
  }) => {
    await page.goto(baseURL);
    const dropdown: string[] = await page
      .locator('//*[@id="country"]/option')
      .allTextContents();
    console.log(dropdown[1]);
    const dropdownValue = dropdown[1].trim();
    console.log(dropdownValue);

    // Use proper locator instead of XPath
    const countryDropdown = page.locator("select#country");
    await countryDropdown.selectOption({ label: dropdownValue });
  });

  test("scrollIntoView", async ({ page }) => {
    await page.goto(baseURL);
    const element = page.locator("#datepicker");
    await element.scrollIntoViewIfNeeded();
    await expect(element).toBeVisible();
  });

  test("frame", async ({ page }) => {
    await page.goto("https://demo.automationtesting.in/Frames.html");
    const frames = page.frames();
    frames.forEach((f) => console.log(f.name()));
    await page
      .frameLocator('iframe[name="SingleFrame"]')
      .locator("input")
      .fill("Hello World!");
  });

  test("SimpleAlert", async ({ page }) => {
    await page.goto(baseURL);

    page.on("dialog", async (dialog) => {
      console.log("Alert message:", dialog.message());
      await dialog.accept();
    });
    await page.locator("#alertBtn").click();
  });

  test("ConfirmAlert", async ({ page }) => {
    await page.goto(baseURL);

    // Register dialog listener BEFORE triggering the alert
    page.on("dialog", async (dialog) => {
      console.log("Confirm message:", dialog.message());
      await dialog.dismiss();
    });

    // Trigger the alert
    await page.locator("#confirmBtn").click();

    // Validate the result text
    await expect(page.locator("#demo")).toHaveText("You pressed Cancel!");
  });

  test("PromptAlert", async ({ page }) => {
    await page.goto(baseURL);
    const prompt = "Playwright Rocks!";
    // Register dialog listener BEFORE triggering the alert
    page.on("dialog", async (dialog) => {
      await dialog.accept(prompt);
    });

    await page.locator("#promptBtn").click();
    // Validate the result text
    await expect(page.locator("#demo")).toContainText(prompt);
  });

  test("windowHandle", async ({ page }) => {
    await page.goto(baseURL);
    await page.locator("button[onclick='myFunction()']").click();
    await page.waitForTimeout(2000);
    await page.bringToFront(); // Brings child window to focus
    await expect(page).toHaveTitle("Automation Testing Practice");
  });

  test("upload a file and screenshot", async ({ page }) => {
    await page.goto(baseURL);

    // Locate the file input
    const fileInput = await page.locator("#singleFileInput");

    // Upload a file
    await fileInput.setInputFiles("./src/data/ContactData.csv");
    // Validate the file name
    await page.screenshot({
      path: "./src/data/screenshot.png",
      fullPage: true,
    });
  });
});

test("verify downloaded text file", async ({ page }) => {
  await page.goto(
    "https://testautomationpractice.blogspot.com/p/download-files_25.html"
  ); // Example URL
  // Fill text and trigger text file download
  await page.getByLabel("Enter Text:").fill("check");
  await page
    .getByRole("button", { name: "Generate and Download Text" })
    .click();

  const textDownloadPromise = page.waitForEvent("download");
  await page.getByRole("link", { name: "Download Text File" }).click();
  const textDownload = await textDownloadPromise;

  // Save the file to the downloads path
  const downloadsPath = path.join(__dirname, "../../src/download");
  const textPath = path.join(downloadsPath, textDownload.suggestedFilename());
  await textDownload.saveAs(textPath);
  console.log("Text file saved to:", textPath);
  expect(fs.existsSync(textPath)).toBeTruthy();
});

test("waitforselector", async ({ page }) => {
  await page.goto(baseURL);
  await page.locator("#datepicker").waitFor({ state: "visible" });
  await page.locator("#datepicker").fill("2023-10-01");
  await page.locator("#datepicker").press("Enter");
  await page.waitForTimeout(2000);
});

test("Check page title and content - Assertion", async ({ page }) => {
  await page.goto("https://example.com");

  // Assert page title
  await expect(page).toHaveTitle(/Example Domain/);

  // Assert a heading contains specific text
  await expect(page.locator("h1")).toHaveText("Example Domain");

  // Assert element is visible
  await expect(page.locator("h1")).toBeVisible();

  // Assert URL
  await expect(page).toHaveURL("https://example.com/");
});
