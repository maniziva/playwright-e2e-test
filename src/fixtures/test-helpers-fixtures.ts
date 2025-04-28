// src/fixtures/test-helpers-fixture.ts
import { test as base } from '@playwright/test';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid'; // If you want UUIDs

const test = base.extend<{
  timestamp: string;
  randomEmail: string;
  randomUsername: string;
  randomUUID: string;
}>({
  timestamp: async ({}, use) => {
    const ts = dayjs().format('YYYYMMHHmmss');
    await use(ts);
  },

  randomEmail: async ({}, use) => {
    const email = `user_${dayjs().format('YYYYMMMHHmmss')}@test.com`;
    await use(email);
  },

  randomUsername: async ({}, use) => {
    const username = `user_${Math.random().toString(36).substring(2, 10)}`;
    await use(username);
  },

  randomUUID: async ({}, use) => {
    const uuid = uuidv4();
    await use(uuid);
  },
});

export { test };