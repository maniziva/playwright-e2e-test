import { test as base, request as playwrightRequest, APIRequestContext } from '@playwright/test';
import * as fs from 'fs';

export const test = base.extend<{
  apiRequest: APIRequestContext;
}>({
  apiRequest: async ({ }, use) => {
    const { token } = JSON.parse(fs.readFileSync('./src/setup/auth-token.json', 'utf-8'));

    const requestContext = await playwrightRequest.newContext({
      baseURL: process.env.BASEURL || '', // Optional if needed
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    await use(requestContext);
    await requestContext.dispose();
  },
});