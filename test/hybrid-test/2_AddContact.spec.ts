import { test, expect, request } from '@playwright/test';
const baseURL = process.env.BASEURL;
const username = process.env.MAILID as string;
const password = process.env.PASSWORD;

let token: string;

test.beforeAll('Login', async ({ }) => {
  // Step 1: Create a new APIRequestContext
  const apiContext = await request.newContext();

  // Step 2: Send Login Request
  const loginPayload = {
    email: username,
    password: password
  };

  const loginResponse = await apiContext.post(baseURL + 'users/login', {
    data: loginPayload
  });

  // Check if the response is OK
  expect(loginResponse.ok()).toBeTruthy();


  const loginData = await loginResponse.json();
  token = loginData.token;
});


test('Add Contact', async ({ page }) => {

  // Set token in localStorage
  page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, token);

  // Add cookies
  await page.context().addCookies([{
    name: 'token',
    value: token,
    domain: new URL(baseURL).hostname,
    path: '/',
    httpOnly: false,
    secure: true,
    sameSite: 'Lax'
  }]);

  await page.goto(baseURL + "contactList");
  await page.getByRole('heading', { name: 'Contact List' }).click();
  // Add Contact
  await page.getByRole('button', { name: 'Add a New Contact' }).click();
  await page.getByPlaceholder('First Name').click();
  await page.getByPlaceholder('First Name').fill('Manikandan');
  await page.getByPlaceholder('Last Name').click();
  await page.getByPlaceholder('Last Name').fill('Adaikalam');
  await page.getByPlaceholder('yyyy-MM-dd').click();
  await page.getByPlaceholder('yyyy-MM-dd').fill('1996-12-07');
  await page.getByPlaceholder('example@email.com').click();
  await page.getByPlaceholder('example@email.com').fill('manizivamsd@gmail.com');
  await page.getByPlaceholder('8005551234').click();
  await page.getByPlaceholder('8005551234').fill('8098606357');
  await page.getByPlaceholder('Address 1').click();
  await page.getByPlaceholder('Address 1').fill('434, Pudumanai 1st street');
  await page.getByPlaceholder('Address 2').click();
  await page.getByPlaceholder('Address 2').fill('Rayavaram');
  await page.getByPlaceholder('City').click();
  await page.getByPlaceholder('City').fill('Pudukkottai');
  await page.getByPlaceholder('State or Province').click();
  await page.getByPlaceholder('State or Province').fill('Tamilnadu');
  await page.getByPlaceholder('Postal Code').click();
  await page.getByPlaceholder('Postal Code').fill('622506');
  await page.getByPlaceholder('Country').click();
  await page.getByPlaceholder('Country').fill('India');
  await page.getByRole('button', { name: 'Submit' }).click();
});