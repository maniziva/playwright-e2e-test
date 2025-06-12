import{expect, test} from '@playwright/test';

test.describe('Test suite', ()=>{
    test('Handle ecommerce Get all prodecuts', async({page})=>{
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
    test('Ecom - 2', async({page}) =>{
        await page.goto('https://magento.softwaretestingboard.com/');
        await expect(page).toHaveTitle('Home Page');

        const cards = await page.locator('ol[class = "product-items widget-product-grid"] li');
        const cardsCount = await cards.count();
        console.log(`Number of Products is: ${cardsCount}`);

        const ProductData1 : {Name: string, Price: number}[] = [];
        for(let i=0; i<cardsCount; i++){
            const row = await cards.nth(i);
            const name = await row.locator('.product-item-details .product-item-link').innerText();
            const price =  await row.locator('.product-item-details .price').innerText();
            const extractPrice = price.match(/(\d+)/);
            
            ProductData1.push({
                Name: name,
                Price: parseInt(extractPrice ? extractPrice[0] : '0', 10)
            })
        }
        console.table(ProductData1);

    });

}); 