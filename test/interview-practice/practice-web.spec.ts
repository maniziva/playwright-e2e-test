//import { expect, test } from "@playwright/test";
import { test } from "@fixtures/test-helpers-fixtures";
import { expect } from "@playwright/test";
import exp from "constants";

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
  test("Navigate based on tab title", async ({ context, page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    // Open multiple tabs (simulated here)
    const tab1 = await context.newPage();
    await tab1.goto(
      "https://testautomationpractice.blogspot.com/p/download-files_25.html"
    );

    const tab2 = await context.newPage();
    await tab2.goto(
      "https://testautomationpractice.blogspot.com/p/gui-elements-ajax-hidden.html"
    );

    const tab3 = await context.newPage();
    await tab3.goto("https://www.programiz.com/typescript/online-compiler/");

    const tab4 = await context.newPage();
    await tab4.goto("https://github.com/maniziva/playwright-e2e-test");

    const tab5 = await context.newPage();
    await tab5.goto("https://github.com/maniziva/playwright-cucumber");

    const tab6 = await context.newPage();
    await tab6.goto("https://github.com/maniziva/");

    // Get all open tabs
    const tabs = context.pages();

    for (const tab of tabs) {
      const title = await tab.title();
      console.log(`Tab title: ${title}`);

      if (title.includes("Download Files")) {
        await tab.bringToFront(); // Focus this tab
        // Perform Download-specific action
        await tab.locator('//textarea[@id="inputText"]').fill("Info");
        await tab.locator('//button[@id="generateTxt"]').click();
        // 1. Start waiting for the download
        const [download] = await Promise.all([
          tab.waitForEvent("download"), // Waits for the download
          await tab.locator('//a[@id="txtDownloadLink"]').click(),
        ]);

        // 2. Get download suggested filename
        const suggestedFileName = download.suggestedFilename();
        expect(suggestedFileName).toBe("info.txt");

        await tab.close();
      }

      if (title.includes("Hidden Elements")) {
        await tab.bringToFront();
        // Perform report-related assertions or downloads
        console.log("Navigates to hidden page");
        await tab.screenshot({ path: "./src/download/pageNavi.png" });
        await tab.close();
      }
    }
  });
  test("frames", async ({ page }) => {
    await page.goto("https://demo.automationtesting.in/Frames.html");

    const singleFrame = page.frame({ name: "SingleFrame" });

    if (!singleFrame) {
      throw new Error("SingleFrame not found");
    }

    await singleFrame.locator("input").fill("Hello from try-catch!");
    console.log("Input filled successfully inside the frame.");
  });
  test("Visual testing", async ({ page }) => {
    await page.goto("https://thinking-tester-contact-list.herokuapp.com/");
    await expect(page).toHaveScreenshot(".loginpage-full.png", {
      fullPage: true,
      threshold: 0.1,  //maxDiffPixels: 10   
        });
  });
  test("[@performance] Measure navigation timings", async ({ page }) => {
      await page.goto("https://example.com");

    const performanceTiming = await page.evaluate(() =>
      JSON.parse(JSON.stringify(window.performance.timing))
    );

    const ttfb =
      performanceTiming.responseStart - performanceTiming.requestStart;
    const pageLoad =
      performanceTiming.loadEventEnd - performanceTiming.navigationStart;

    console.log(`Time to First Byte (TTFB): ${ttfb} ms`);
    console.log(`Full Page Load Time: ${pageLoad} ms`);

    const threshold = 500; // Set your performance limit
    expect(ttfb).toBeLessThan(threshold);
  });
  test("mock detail page API response after real login", async ({ page }) => {
    // 1. Setup interception BEFORE navigation
    await page.route("**/contacts", async (route) => {
      // endpoint should be 'contacts' not 'contactList'
      const mockResponse = [
        {
          _id: "68027018e86fb700159aa6bc",
          firstName: "Mock",
          lastName: "Doe",
          birthdate: "1970-01-01",
          email: "jdoe@fake.com",
          phone: "8005555555",
          street1: "1 Main St.",
          street2: "Apartment A",
          city: "Anytown",
          stateProvince: "KS",
          postalCode: "12345",
          country: "USA",
          owner: "68025c5ce86fb700159aa665",
          __v: 0,
        },
      ];

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockResponse),
      });
    });

    // 2. Go to login page
    await page.goto("https://thinking-tester-contact-list.herokuapp.com/login");

    // 3. Perform real login
    await page.locator('input[id="email"]').fill("master@gmail.com");
    await page.locator('input[id="password"]').fill("Info@1234");
    await page.locator('button[id="submit"]').click();

    // 4. Wait for contact list page
    await page.waitForURL("**/contactList");

    // 5. Assert mocked contact is shown
    await expect(page.locator("text=Mock")).toBeVisible();
    await expect(page.locator("text=jdoe@fake.com")).toBeVisible();
  });
  test("Test with multiple helpers", async ({
    page,
    timestamp,
    randomEmail,
    randomUsername,
    randomUUID,
  }) => {
    console.log("Timestamp:", timestamp);
    console.log("Random Email:", randomEmail);
    console.log("Random Username:", randomUsername);
    console.log("Random UUID:", randomUUID);
  });
});