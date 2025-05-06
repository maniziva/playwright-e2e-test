import { test, expect } from '@playwright/test';

const productsToFind = ['Faded Short Sleeve T-shirts', 'Blouse', 'Printed Chiffon Dress'];

test('Get product prices from automationpractice.pl', async ({ page }) => {
  await page.goto('http://www.automationpractice.pl/index.php?id_category=3&controller=category');

  for (const productName of productsToFind) {
    const productCard = page.locator('li.ajax_block_product', {
      has: page.locator('.product-name', { hasText: productName })
    });

    if (await productCard.count() === 0) {
      console.log(`❌ Product not found: ${productName}`);
      continue;
    }

    const price = await productCard.locator('.price.product-price').nth(0).textContent();
    console.log(`✅ ${productName} - Price: ${price?.trim()}`);
  }
});


test('Print all product names and prices from automationpractice.pl', async ({ page }) => {
    await page.goto('http://www.automationpractice.pl/index.php?id_category=3&controller=category');
  
    // Get all product cards
    const productCards = page.locator('ul.product_list li.ajax_block_product');
    const count = await productCards.count();
  
    console.log(`🛍️ Total Products Found: ${count}`);
  
    for (let i = 0; i < count; i++) {
      const product = productCards.nth(i);
      const name = await product.locator('.product-name').textContent();
      const price = await product.locator('.price.product-price').first().textContent();
  
      console.log(`✅ ${name?.trim()} - ${price?.trim()}`);
    }
  });

  test.only('Extract all product names and prices from DemoBlaze', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveTitle('Swag Labs')
  
    const productCards = page.locator('.inventory_item');
    const count = await productCards.count();
    console.log(`🛍️ Total Products Found: ${count}`);
  
    for (let i = 0; i < count; i++) {
      const card = productCards.nth(i);
      const name = await card.locator('.inventory_item_name ').textContent();
      const price = await card.locator('.inventory_item_price').textContent();
  
      console.log(`${name?.trim()} - ${price?.trim()}`);
    }


    const productsToAdd = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

    for (const productName of productsToAdd) {
      const productCard = page.locator('.inventory_item', {
        has: page.locator('.inventory_item_name', { hasText: productName })
      });
  
      await productCard.getByRole('button', { name: 'Add to cart' }).click();
      await productCard.getByRole('button', { name: 'Remove' }).isVisible();
      console.log(`✅ Added to cart: ${productName}`);
    }
  });