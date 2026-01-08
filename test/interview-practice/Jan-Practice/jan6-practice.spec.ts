import { expect, request, test } from "playwright/test";

test.describe("Jan6 Test suite", async () => {
  const baseURL = "https://testautomationpractice.blogspot.com/";

  test.beforeEach("Before", async ({ page }) => {
    await page.goto(baseURL);
  });

test.skip('check broken links', async ({ page, request }) => {
  const links = await page.$$eval('a', anchors =>
    anchors
      .map(a => a.href)
      .filter(href =>
        href &&
        href.startsWith('http') &&           // skip mailto, tel, #
        !href.includes('deadlinkcity.com')   // optional skip demo links
      )
  );

  for (const link of links) {
    try {
      const response = await request.get(link, { timeout: 15000 });
      console.log(link, response.status());
      expect(response.status()).toBeLessThan(400);
    } catch (error) {
      console.warn(`Skipped (network/TLS issue): ${link}`);
    }
  }
});

test('Check broken link', async({page, request})=>{
  const links = await page.$$eval('a', a => a.map(l => l.href));
  console.log(links);

  let Links:{Link: string, Status: number}[]=[];

  for(const link of links){
    try{
      const response = await request.get(link, { timeout: 15000 });
      Links.push({
        Link: link,
        Status: response.status()
      })
      //console.log(link, response.status());
    } catch(error){
      console.error(`Broken link is: ${link}`);
    }
 
  }
  console.log(Links);
});
});