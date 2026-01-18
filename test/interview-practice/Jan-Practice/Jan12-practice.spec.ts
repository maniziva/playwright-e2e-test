import { expect, request, test } from "playwright/test";

test.use({ video: "on" });

test.describe("Jan12 Test suite", async () => {
  const baseURL = "https://practicetestautomation.com/practice-test-table/";

  test("Dropdown", async ({ browser }) => {
    const context = await browser.newContext({
      recordVideo: {
        dir: "src/videos/",
        size: { width: 1280, height: 720 },
      },
    });

    const page = await context.newPage();
        await page.goto(baseURL);

    const dropdown = await page.locator("select[id=sortBy]");
    const values = await dropdown.evaluate((select) => {
      return [...(select as HTMLSelectElement).options].map(
        (option) => option.text
      );
    });
    console.log(values);

    await dropdown.selectOption({ value: "col_course" });
    const selectedValues = await dropdown.evaluate((select) => {
      return [...(select as HTMLSelectElement).selectedOptions].map(
        (option) => option.text
      );
    });
    console.log(selectedValues);

    await context.close(); // 👈 video is saved here
  });
});
