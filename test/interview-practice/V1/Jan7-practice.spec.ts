import { expect, request, test } from "playwright/test";

test.describe("Jan7 Test suite", async () => {
  const baseURL = "https://automationexercise.com/";

  test.beforeEach("Before", async ({ page }) => {
    await page.goto(baseURL);
  });

test('Dropdown', async({page})=>{
  
});

test('API', async({page, request})=>{
  
});

test('Download-Upload', async({page})=>{
  
});

test('Alert', async({page})=>{
  
});

test('Scroll', async({page})=>{
  
});

test('Get Tabledata', async({page})=>{
  
});

test('Get ecom data', async({page})=>{
  
});
});