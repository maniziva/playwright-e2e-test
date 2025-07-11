import { expect, test } from "@playwright/test";
import * as fs from "fs";

test.describe("Test suite", () => {
  test("Upload", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const single = await page.locator("#singleFileInput");
    await single.setInputFiles("src/data/UserData.json");
    await single.scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Upload Single File" }).click();
    await expect(page.locator("#singleFileStatus")).toContainText("UserData.json");
  });
  test("Download", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/p/download-files_25.html");

    await page.locator("#inputText").fill("check");
    await page.getByRole("button", { name: "Generate and Download Text File" }).click();
    //await page.locator("#txtDownloadLink").click();

    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.locator("#txtDownloadLink").click(),
    ]);

    await download.saveAs("src/download/downloaded.txt");
    console.log("Downloaded to:", await download.path());
    // Optional: assert file content
    const content = fs.readFileSync("src/download/downloaded.txt", "utf-8");
    expect(content).toContain("check");
  });
});
