import {
  chromium,
  expect,
  test,
  Browser,
  firefox,
  webkit,
} from "@playwright/test";

test.describe("thinkapp test", () => {
  const url = "https://thinking-tester-contact-list.herokuapp.com/login";

  test("Browser check", async () => {
    //chrome
    const chromiumBrowser: Browser = await chromium.launch({ headless: false });
    const chromiumContext = await chromiumBrowser.newContext();
    const chromiumPage = await chromiumContext.newPage();
    await chromiumPage.goto(url);
    await chromiumBrowser.close();
    // Firefox
    const firefoxBrowser: Browser = await firefox.launch({ headless: false });
    const firefoxContext = await firefoxBrowser.newContext();
    const firefoxPage = await firefoxContext.newPage();
    await firefoxPage.goto(url);
    await firefoxBrowser.close();

    // WebKit
    const webkitBrowser: Browser = await webkit.launch({ headless: false });
    const webkitContext = await webkitBrowser.newContext();
    const webkitPage = await webkitContext.newPage();
    await webkitPage.goto(url);
    await webkitBrowser.close();
  });
});
