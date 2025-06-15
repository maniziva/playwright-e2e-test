import { test, expect, request } from '@playwright/test';
import * as fs from 'fs';

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

  //console.log('Extracted Token:', token);
});

test('Get Contact', async ({ }) => {
  // Step 1: Create a new APIRequestContext
  const apiContext = await request.newContext();
  const GetContactResponse = await apiContext.get(baseURL + 'contacts', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  // Check if the response is successful
  expect(GetContactResponse.ok()).toBeTruthy();

  const GetContactResponseData = await GetContactResponse.json();
  //console.log('Get Contact Response:', GetContactResponseData);
  fs.writeFileSync('src/data/contactResponse.json', JSON.stringify(GetContactResponseData, null, 2));

  // const firstContact = GetContactResponseData[0];
  // const firstName = firstContact.firstName;
  // console.log('First Name:', firstName);

  // Dispose of the API context
  await apiContext.dispose();
});

test('Read Json Data', async()=>{
    const Jsondata = JSON.parse(fs.readFileSync('src/data/contactResponse.json','utf-8'));
    //console.log(Jsondata);
    const data = Jsondata.find((item: any) => item.street2 ==='Rayavaram');
    console.log(data);
})

test.afterAll('Logout', async ({ }) => {
  const apiContext = await request.newContext();
  // Step 2: Send Logout Request Using the Token
  const logoutResponse = await apiContext.post(baseURL + 'users/logout', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  // Check if the logout is successful
  expect(logoutResponse.ok()).toBeTruthy();

  // Dispose of the API context
  await apiContext.dispose();
});