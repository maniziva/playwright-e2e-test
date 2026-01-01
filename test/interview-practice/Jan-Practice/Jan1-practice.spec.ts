import { expect, request, test } from "playwright/test";
import * as fs from "fs";

test.describe("Jan1 Test suite", async () => {
  const baseURL = "https://testautomationpractice.blogspot.com/";

  test.beforeEach("Before", async ({ page }) => {
    await page.goto(baseURL);
  });

  test("Assert Dropdown", async ({ page }) => {
    const dropdown = await page.locator('select[id="colors"]');

    const values = await dropdown.evaluate((select) => {
      return [...(select as HTMLSelectElement).options].map(
        (option) => option.value
      );
    });

    console.log(values);

    await dropdown.selectOption([{ value: "red" }, { value: "yellow" }]);

    const selectedvalues = await dropdown.evaluate((select) => {
      return [...(select as HTMLSelectElement).selectedOptions].map(
        (option) => option.text
      );
    });
    console.log(selectedvalues);
  });

  test("Data driven", async ({ page }) => {
    const jsonData = JSON.parse(
      fs.readFileSync("src/data/DataDriven/tabledata.json", "utf-8")
    );
    console.log(jsonData);

    fs.writeFileSync('src/data/DataDriven/tabledata1.json',JSON.stringify(jsonData, null, 2));
  });
});
