import { expect, request, test } from "playwright/test";

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

  test.only("scroll", async ({ page }) => {
    await page.goto("https://infinite-scroll.com/demo/full-page/");

    let maxScroll = 100;
    let previousHeight = 0;

    for(let i=0; i<maxScroll; i++){
        await page.evaluate(() => {window.scrollTo(0, document.body.scrollHeight);});
        await page.waitForTimeout(1500); // allow time for loading
        let currentHeight = await page.evaluate(()=> document.body.scrollHeight);

      if(currentHeight === previousHeight){
        console.log('page came to end');
        break;
      }
      previousHeight = currentHeight;
    }

    
  });
});
