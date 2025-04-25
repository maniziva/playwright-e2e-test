//import { test, expect } from '@playwright/test';
import { test } from '@fixtures/api-fixtures';
import { expect } from '@playwright/test';

test.describe.parallel('API Practice', () => {
  test('Get contact', async ({ apiRequest }) => {
    const response = await apiRequest.get('users/me');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const data = await response.json();
    console.log(data);
    expect(data.email).toContain('master@gmail.com');
  });
});