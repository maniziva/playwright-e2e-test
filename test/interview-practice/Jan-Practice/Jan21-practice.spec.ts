import { test } from "playwright/test";
import * as fs from 'fs';
import { faker, simpleFaker } from '@faker-js/faker';


test.describe("Jan21 Test suite", async () => {
  //const baseURL = "https://practicetestautomation.com/practice-test-table/";

  test("Facker check", async ({ page }) => {
    //await page.goto(baseURL);
    
  console.log(faker.commerce.product());
  
  console.log(faker.commerce.productName());

  console.log(faker.person.firstName('male'));
  });
});
