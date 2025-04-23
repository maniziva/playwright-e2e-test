import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables from the specified file or default to './src/env/staging.env'
const envFile = process.env.ENV_FILE || './src/env/staging.env';
dotenv.config({ path: envFile });

export default defineConfig({
  globalSetup: require.resolve('./src/setup/api-global-setup'),
  timeout: 60000,
  testDir: './test/interview-practice',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : 1,
  reporter: [['html'], ['allure-playwright'], ['junit', { outputFile: 'test-results/junit-report.xml' }]],
  use: {
    trace: "retain-on-failure",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: 'api-tests',
      use: {
        baseURL: process.env.API_BASEURL,
      },
    },
  ],
});
