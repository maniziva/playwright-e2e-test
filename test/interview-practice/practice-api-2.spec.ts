//import { test, expect } from '@playwright/test';
import { test } from '@fixtures/api-fixtures';
import { expect } from '@playwright/test';

test.describe.parallel('API Practice', () => {
  test('Get contact', async ({ apiRequest }) => {
    const response = await apiRequest.get('users/me');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });

  test('Get contact - Response Assertion - Json Validation', async ({ apiRequest }) => {
    const response = await apiRequest.get('users/me');
    const data = await response.json();
    //console.log(data);
    expect(data.email).toContain('master@gmail.com');
  });

  test('Get contact - Response Assertion - RegEx Validation', async ({ apiRequest }) => {
    const response = await apiRequest.get('users/me');
    const data = await response.json();
    //console.log(data);
    const text = JSON.stringify(data);
    //console.log(text);
    let matches = text.match(/"email":"(.*?)@gmail.com/i);
    console.log(matches[1]); 
  });
});