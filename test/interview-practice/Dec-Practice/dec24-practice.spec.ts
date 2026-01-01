import { Browser, chromium, firefox, test, webkit } from 'playwright/test';

test.describe('Dec-24 Test suite', async()=>{
    test('LaunchBrowser', async({page})=>{
        const chromiumBrowser: Browser = await chromium.launch();
        const chromiumContext = await chromiumBrowser.newContext();
        const chromiumPage = await chromiumContext.newPage();
        
        const firefoxBrowser: Browser = await firefox.launch();
        const firefoxContext = await firefoxBrowser.newContext();
        const firefoxPage = await firefoxContext.newPage();

        const webkitBrowser: Browser = await webkit.launch();
        const webkitContext = await webkitBrowser.newContext();
        const webkitPage = await webkitContext.newPage();
    
        await chromiumPage.goto('https://testautomationpractice.blogspot.com/');
        await firefoxPage.goto('https://testautomationpractice.blogspot.com/');
        await webkitPage.goto('https://testautomationpractice.blogspot.com/');
    
    })
})