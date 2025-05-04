import { test, expect, request } from '@playwright/test';
const baseURL = process.env.BASEURL;
const username = process.env.MAILID as string;
const password = process.env.PASSWORD;

test('API response time should be under 2 seconds', async ({  }) => {
  const thresholdMs = 2000; // 2 seconds

  const startTime = performance.now();

  const apiContext = await request.newContext();

  // Step 2: Send Login Request
  const loginPayload = {
    email: username,
    password: password
  };

  const response = await apiContext.post(baseURL+'users/login', {
    data: loginPayload
  });

  const duration = performance.now()-startTime;

  console.log(`Response time: ${duration} ms`);

  // Optional: Check status
  expect(response.status()).toBe(200);

  // Assert response time
  expect(duration).toBeLessThan(thresholdMs);

});