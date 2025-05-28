import{test} from '@playwright/test';

test.describe('Test suite', ()=>{
    test.only('Handle ecommerce Get all prodecuts', async({page})=>{
        await page.goto('https://www.automationexercise.com/');
        const productCard = await page.locator('.features_items div[class ="col-sm-4"]');
        const productCount = await productCard.count();
        console.log(`Number of Products: ${productCount}`);

        const ProductData : { ProductName: string, ProductPrice: number} [] = [];

        for(let i=1; i<productCount; i++){
            const row = productCard.nth(i);
            const productName = await row.locator('p').first().innerText();
            const productPrice = await row.locator('h2').first().innerText();
            const extractPrice = productPrice.match(/\d+/);

            ProductData.push({
                ProductName: productName,
                ProductPrice: parseInt(extractPrice ? extractPrice[0] : '0', 10)
            });
        }
        console.table(ProductData);
    });
}); 