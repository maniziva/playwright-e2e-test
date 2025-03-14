import { test, expect, request } from '@playwright/test';
const baseURL = process.env.BASEURL;
const username = process.env.MAILID as string;
const password = process.env.PASSWORD;

test.skip('API Test - Login and Logout', async ({}) => {
  // Step 1: Create a new APIRequestContext
  const apiContext = await request.newContext();

  // Step 2: Send Login Request
  const loginPayload = {
    email: username,
    password: password
  };

  const loginResponse = await apiContext.post(baseURL+'users/login', {
    data: loginPayload
  });

  // Check if the response is OK
  expect(loginResponse.ok()).toBeTruthy();

  // Extract the token from the response
  const loginData = await loginResponse.json();
  const token = loginData.token;

//   console.log('Extracted Token:', token);

  // Step 2: Send Logout Request Using the Token
  const logoutResponse = await apiContext.post(baseURL+'users/logout', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  // Check if the logout is successful
  expect(logoutResponse.ok()).toBeTruthy();

  // Dispose of the API context
  await apiContext.dispose();
});