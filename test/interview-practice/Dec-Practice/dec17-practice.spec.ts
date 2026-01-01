import { log } from "node:console";
import { CLIENT_RENEG_LIMIT } from "node:tls";
import {
  Browser,
  chromium,
  expect,
  firefox,
  test,
  webkit,
} from "playwright/test";

import * as fs from 'fs';

test.describe("Dec-17 Practice tests", async () => {
  const baseURL = "https://testautomationpractice.blogspot.com/";
  test.beforeEach(async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
  });
  test("[Dec-17] - 1. Assert title and URL", async ({ page }) => {
    const title = await page.title();
    console.log(title);
    await expect(page).toHaveTitle(/Automation.*/gi);
    await expect(page).toHaveURL(/testautomationpractice/gi);
  });
  test("[Dec-17] - 2. Different page contexts", async ({ page }) => {
    const chromeBrowser: Browser = await chromium.launch();
    const chromeContext = await chromeBrowser.newContext();
    const chromePage = await chromeContext.newPage();

    const firefoxBrowser: Browser = await firefox.launch();
    const firefoxContext = await firefoxBrowser.newContext();
    const firefoxPage = await firefoxContext.newPage();

    const webkitBrowser: Browser = await webkit.launch();
    const webkitContext = await webkitBrowser.newContext();
    const webkitPage = await webkitContext.newPage();

    await chromePage.goto("https://testautomationpractice.blogspot.com/");

    await firefoxPage.goto("https://www.flipkart.com/");

    await webkitPage.goto("https://www.amazon.in/");
  });
  test("[Dec-17] - 3. Get Table data", async ({ page }) => {
    const tableRow = page.locator('table[name="BookTable"] tr');
    const rowCount = await tableRow.count();
    console.log(rowCount);
    const tableData: {
      Name: string;
      Author: string;
      Subject: string;
      Price: number;
    }[] = [];
    for (let i = 1; i < rowCount; i++) {
      const row = await tableRow.nth(i);
      const name = await row.locator("td").nth(0).innerText();
      const author = await row.locator("td").nth(1).innerText();
      const subject = await row.locator("td").nth(2).innerText();
      const price = parseInt(await row.locator("td").nth(3).innerText());

      tableData.push({
        Name: name,
        Author: author,
        Subject: subject,
        Price: price,
      });
    }
    console.table(tableData);
    const totalPrice = tableData.reduce((a, b) => a + b.Price, 0);
    console.log(totalPrice);
  });
      test('[Dec-17] - 4. Get ecom data', async({page})=>{
        await page.goto('https://www.flipkart.com/all/~cs-7fac62032f285fd41077836ef816b219/pr?sid=r18,f13&marketplace=FLIPKART&restrictLocale=true');
        const products = page.locator('div[data-id]');
        const productsCount = await products.count();
        console.log(productsCount);

        const tableData: {Name: string, Price: number}[] =[];
        for(let i=0; i<productsCount;i++){
            const product = await products.nth(i);
            const name = await product.locator('div[class="Fo1I0b"]').innerText();
            const price = await product.locator('div[class="hZ3P6w"]').innerText();

            // Extract digits from the price string and parse to number
            const digits = price.replace(/\D/g, '');
            const priceValue = digits ? parseInt(digits, 10) : 0;

            tableData.push({
                Name: name,
                Price: priceValue
            })
        }
        console.table(tableData);
  })
        test('[Dec-17] - 5. Get ecom data and store in external file', async({page})=>{
            await page.goto('https://thechennaishoppingmall.com/');
            const products = page.locator('div[class="product-item__info-inner"]');
            const productCount = await products.count();
            console.log(productCount);

            const data:{Name: string, Price: string}[]=[];
            for(let i=0; i<7; i++){
                const product = await products.nth(i);
                const price = await product.locator('span[class="price price--highlight"]').innerText();
                const name = await product.locator('a[class="product-item__title text--strong link"]').innerText();
                data.push({
                    Name: name,
                    Price: price
                })
            }
            console.table(data);
            // fs.writeFileSync('src/download/ecomdata.json',JSON.stringify(data, null,2))
            const csv = [
              ['Name', 'Price'],
              ...data.map(item => [item.Name, item.Price])
            ].map(row => row.join(',')).join('\n');
            fs.writeFileSync('src/download/ecomdata.csv', csv)
  })
      test('[Dec-17] - 6. Read/write json File', async({page})=>{

        const jsonData = JSON.parse(fs.readFileSync('src/download/ecomdata.json','utf-8'));
        //console.log(jsonData);

        const filteredData = jsonData.filter((item: any) => String(item.Price).includes('749'));
        console.log(filteredData);

        fs.writeFileSync('src/download/ecomdata2.json',JSON.stringify(filteredData, null,2))
  })
});
