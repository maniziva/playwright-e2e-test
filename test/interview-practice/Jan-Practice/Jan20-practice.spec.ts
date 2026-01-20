import { test } from "playwright/test";

test.describe("Jan20 Test suite", async () => {
  const baseURL = "https://practicetestautomation.com/practice-test-table/";

  test("Dropdown", async ({ page }) => {
    await page.goto(baseURL);

    const dropdown = await page.locator("select[id=sortBy]");
    const values = await dropdown.evaluate((select) => {
      return [...(select as HTMLSelectElement).options].map(
        (option) => option.text,
      );
    });
    console.log(values);

    await dropdown.selectOption({ value: "col_course" });
    const selectedValues = await dropdown.evaluate((select) => {
      return [...(select as HTMLSelectElement).selectedOptions].map(
        (option) => option.text,
      );
    });
    console.log(selectedValues);
  });
});
