import { expect, request, test } from "playwright/test";
import { title } from "process";

test.describe("Feb16 Test suite", async () => {
  const baseURL = "https://practicetestautomation.com/practice-test-login/";

  test("Js Executor", async ({ page }) => {
    await page.goto(baseURL);
    await page.evaluate(() => {
      (document.getElementById("username") as HTMLInputElement).value =
        "student";
    });
  });

  test("download", async ({ page }) => {
    await page.goto(
      "https://testautomationpractice.blogspot.com/p/download-files_25.html",
    );
    await page.locator('//button[@id="generateTxt"]').click();

    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.click('//a[@id="txtDownloadLink"]'), // Triggers the download
    ]);

    // Optionally validate the filename
    const suggestedName = download.suggestedFilename();
    await download.saveAs(`src/download/${suggestedName}`);

    console.log(suggestedName);
  });

  test("Drag and drop", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    // const drag = page.locator("#draggable");
    // await page.dragAndDrop("#draggable", "#droppable");

    // await drag.screenshot({ path: "src/download/dragdrop.png" });

    const source = page.locator("#draggable");
    const target = page.locator("#droppable");

    await source.dragTo(target);

    await page.screenshot({ path: "src/download/dragdrop2.png" });
  });

  test("scroll", async ({ page }) => {
    await page.goto("https://infinite-scroll.com/demo/full-page/");

    let maxScroll = 100;
    let previousHeight = 0;

    for (let i = 0; i < maxScroll; i++) {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      await page.waitForTimeout(1500); // allow time for loading
      let currentHeight = await page.evaluate(() => document.body.scrollHeight);

      if (currentHeight === previousHeight) {
        console.log("page came to end");
        break;
      }
      previousHeight = currentHeight;
    }

    const title = await page.locator('article[class="article"]');
    const count = await title.count();
    console.log(count);

    const article: { Title: string }[] = [];

    for (let i = 0; i < count; i++) {
      const row = await title.nth(i);
      const articleTitle = await row.locator("h2").innerText();

      article.push({
        Title: articleTitle,
      });
    }

    console.table(article);
  });
});

test("tableData", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  const tabledata = await page.locator('table[id="productTable"] tbody tr');
  const count = await tabledata.count();
  console.log(count);

  await page
    .locator('table[id="productTable"] tbody tr td input')
    .nth(1)
    .check();

  const tableData: {
    ID: string;
    Name: string;
    Price: string;
    Select: boolean;
  }[] = [];

  for (let i = 0; i < count; i++) {
    const row = await tabledata.nth(i);
    const id = await row.locator("td").nth(0).innerText();
    const name = await row.locator("td").nth(1).innerText();
    const price = await row.locator("td").nth(2).innerText();
    const select = await row.locator("td input").isChecked();

    tableData.push({
      ID: id,
      Name: name,
      Price: price,
      Select: select,
    });
  }

  console.table(tableData);

  const name = await tableData
    .filter((check) => check.Select === true)
    .map((name) => name.Name);
  console.log(`Selected checkbox name is: ${name}`);
});
