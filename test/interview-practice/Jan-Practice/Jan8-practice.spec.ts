import { expect, request, test } from "playwright/test";

test.describe("Jan8 Test suite", async () => {
  const baseURL = "https://practice-automation.com/";

  test.beforeEach("Before", async ({ page }) => {
    await page.goto(baseURL);
  });

  test("Window handle", async ({ page, context }) => {
    await page.goto("https://practice-automation.com/window-operations/");
    console.log(await page.title());

    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      page.locator('button[onclick="newTab()"]').click(),
    ]);

    const newPageTitle = await newPage.title();
    console.log(newPageTitle);

    await newPage.bringToFront();
    await page.bringToFront();
  });

  test("Download-Upload", async ({ page }) => {
    await page.goto("https://practice-automation.com/file-download/");
    //await page.locator('a[class="wpdm-download-link download-on-click btn btn-primary "]').click()
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page
        .locator(
          'a[class="wpdm-download-link download-on-click btn btn-primary "]'
        )
        .click(),
    ]);
    await download.saveAs("src/download/test.pdf");
  });

  test("Simple Alert", async ({ page }) => {
    await page.goto("https://practice-automation.com/popups/");
    await page.locator('button[onclick="alertPopup()"]').click();
    await page.on("dialog", async (dialog) => {
      await dialog.accept();
    });
  });

  test("Confirm Alert", async ({ page }) => {
    await page.goto("https://practice-automation.com/popups/");
    await page.locator('button[onclick="confirmPopup()"]').click();
    await page.on("dialog", async (dialog) => {
      await dialog.dismiss();
    });
  });

  test("Prompt Alert", async ({ page }) => {
    await page.goto("https://practice-automation.com/popups/");
    await page.locator('button[onclick="promptPopup()"]').click();
    await page.on("dialog", async (dialog) => {
      await dialog.accept("Check");
    });
  });

  test("Js executor", async ({ page }) => {
    await page.goto("https://practicetestautomation.com/practice-test-login/");

    //const input = await page.locator('input[name="username"]');
    await await page.locator('input[name="username"]').evaluate((text) => {
      (text as HTMLInputElement).value = "Manikandan";
    });
    await await page.locator('button[id="submit"]').evaluate((text) => {
      (text as HTMLButtonElement).click();
    });
  });

  test("Network Intercept-fullfill", async ({ page }) => {
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
  });

  test("Network Intercept-continue", async ({ page }) => {
    // 1. Setup interception BEFORE navigation
    await page.route("**/contacts", async (route) => {
      // endpoint should be 'contacts' not 'contactList'
      const request = route.request();
      await route.continue({
        headers: {
          ...request.headers(),
          Authorization: "Bearer dummy-token",
        },
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
  });
});
