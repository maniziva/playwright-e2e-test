import { expect, test } from "@playwright/test";
const baseURL = "https://testautomationpractice.blogspot.com/";

test.describe.parallel("Practice - Web", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
  });
  test("Navigate to Application", async ({ page }) => {
    await expect(page).toHaveURL(
      "https://testautomationpractice.blogspot.com/"
    );
    await expect(page).toHaveTitle("Automation Testing Practice");
  });
  test("TextBox", async ({ page }) => {
    const name = await page.locator("#name");
    await name.fill("Manikandan");
    await expect(name).toHaveValue("Manikandan");
  });
  test("Radio Button", async ({ page }) => {
    const MaleRadioButton = page.locator("#male");
    await MaleRadioButton.check();
    await expect(MaleRadioButton).toBeChecked();
  });
  test("Checkbox", async ({ page }) => {
    const sunday = await page.locator("#sunday");
    await sunday.check();
    await expect(sunday).toBeChecked();
    await sunday.uncheck();
    await expect(sunday).not.toBeChecked();
  });
  test("DropDown select", async ({ page }) => {
    const dropDown = await page.locator("#country");
    await dropDown.click();

    await dropDown.selectOption("Canada"); // By value or await dropDown.selectOption(value: 'Canada');
    await expect(dropDown).toHaveValue("canada");

    await dropDown.selectOption({ index: 2 }); // By index
    await expect(dropDown).toHaveValue("uk");

    await dropDown.selectOption({ label: "Germany" }); // By label
    await expect(dropDown).toHaveValue("germany");
  });
  test("Get All dropdown values", async ({ page }) => {
    const dropdown = await page.locator("#country");
    const dropdownvalues: string[] = await dropdown.allTextContents();
    //const trimmedvalues = dropdownvalues.map(option => option.trim());
    //console.log(dropdownvalues);
  });
  test("Assert value in dropdown", async ({ page }) => {
    const dropDownvalue = await page.locator('//select[@id="country"]');
    await expect(dropDownvalue).toContainText("India");
  });
  test("Multiple select and assertion", async ({ page }) => {
    const multiselect = await page.locator("#colors");
    await multiselect.click();
    await multiselect.selectOption([{ label: "Blue" }, { value: "red" }]);

    const selected = await page.$eval("#colors", (el) =>
      Array.from((el as HTMLSelectElement).selectedOptions).map((o) => o.value)
    );

    expect(selected).toEqual(["red", "blue"]); // or use arrayContaining if order doesn't matter
    //expect(selected).toEqual(expect.arrayContaining(['red', 'blue']));
  });
  test("Date Picker - 2", async ({ page }) => {
    //Date picker1
    const datepicker = await page.locator('//input[@id="datepicker"]');
    await datepicker.click();
    await datepicker.fill("20/05/2025");
    await page.keyboard.press("Escape");
    //Date picker 2
    const txtDate = await page.locator('//input[@id="txtDate"]');
    await txtDate.click();
    await page.selectOption(".ui-datepicker-month", "Jan");
    await page.selectOption(".ui-datepicker-year", "2015");
    await page.locator("td >> text=15").click();
  });
  test("File upload, screenshot and scroll into selector", async ({ page }) => {
    const fileupload = await page.locator("#singleFileInput");
    const multifileupload = await page.locator("#multipleFilesInput");
    await fileupload.scrollIntoViewIfNeeded();
    await fileupload.setInputFiles("./src/data/ContactData.csv");
    await multifileupload.setInputFiles([
      "./src/data/ContactData.csv",
      "./src/data/ContactData-copy.csv",
    ]);
    await page.screenshot({
      path: "./src/download/fileupload.png",
      fullPage: true,
    });
  });
  test("static table", async ({ page }) => {
    const rows = await page.locator('//table[@name="BookTable"]/tbody/tr');
    const rowCount = await rows.count();
    console.log(rowCount);

    for (let i = 1; i < rowCount; i++) {
      const row = rows.nth(i);
      const BookName = await row.locator("td").nth(0).textContent();
      const Author = await row.locator("td").nth(1).textContent();
      const Price = await row.locator("td").nth(2).textContent();
      console.log(
        `Row ${
          i + 1
        }: ${BookName?.trim()} | ${Author?.trim()} | ${Price?.trim()}`
      );
    }
  });
  test("Simple Alert", async ({ page }) => {
    const simpleAlert = await page.getByRole("button", {
      name: "Simple Alert",
    });

    await page.on("dialog", async (dialog) => {
      console.log(dialog.message());
      await dialog.accept();
    });
    await simpleAlert.click();
  });
  test("Confirmation Alert", async ({ page }) => {
    const confirmationAlert = await page.getByRole("button", {
      name: "Confirmation Alert",
    });

    await page.on("dialog", async (dialog) => {
      console.log(dialog.message());
      await dialog.dismiss();
    });
    await confirmationAlert.click();
  });
  test("Prompt Alert", async ({ page }) => {
    const promptAlert = await page.getByRole("button", {
      name: "Prompt Alert",
    });
    await page.on("dialog", async (dialog) => {
      console.log(dialog.message());
      await dialog.accept("Prompt");
    });
    await promptAlert.click();
    await expect(page.locator("#demo")).toContainText("Prompt");
  });
  test("Drag and Drop", async ({ page }) => {
    const dragElement = await page.locator('//div[@id="draggable"]');
    const dropElement = await page.locator('//div[@id="droppable"]');
    await dragElement.click();
    await page.dragAndDrop('//div[@id="draggable"]', '//div[@id="droppable"]');
  });
  test("New Tab", async ({ page, context }) => {
    await page.getByRole("button", { name: "New Tab" }).click(); // action that opens the tab

    const [newTab] = await Promise.all([
      context.waitForEvent("page"), // listen for new tab
      // await page.getByRole('button',{name: 'New Tab'}).click();                  // action that opens the tab
    ]);

    await newTab.waitForLoadState();

    const title = await newTab.title();
    console.log("Current tab title:", title);

    await newTab.close();
    await page.bringToFront();

    const Currenttitle = await page.title();
    console.log("Current tab title:", Currenttitle);
  });
  test("Hover element", async ({ page }) => {
    await page.getByRole("button", { name: "Point Me" }).hover();
    await page.getByText("Mobiles").click();
  });
  test("Download File", async ({ page }) => {
    await page.getByRole("link", { name: "Download Files" }).click();

    await page.waitForLoadState("networkidle");
    await page.locator('//textarea[@id="inputText"]').fill("Info");
    await page.locator('//button[@id="generateTxt"]').click();
    // 1. Start waiting for the download
    const [download] = await Promise.all([
      page.waitForEvent("download"), // Waits for the download
      await page.locator('//a[@id="txtDownloadLink"]').click(),
    ]);

    // 2. Get download suggested filename
    const suggestedFileName = download.suggestedFilename();
    expect(suggestedFileName).toBe("info.txt");
  });
});
