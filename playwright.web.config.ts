import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables from the specified file or default to './src/env/staging.env'
const envFile = process.env.ENV_FILE || './src/env/staging.env';
dotenv.config({ path: envFile });

export default defineConfig({
  timeout: 60000,
  testDir: './test/web-test',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : 1,
  reporter: [['html'], ['allure-playwright'], ['junit', { outputFile: 'test-results/junit-report.xml' }]],
  use: {
    trace: "retain-on-failure", //"on", "off", "retain-on-failure",
    video: "retain-on-failure", //"on", "off", "retain-on-failure",
    screenshot: "only-on-failure", //"on", "off", "only-on-failure",
  },
  projects: [
    {
      name: "setup",
      testDir: "./",
      testMatch: "web-global-setup.ts",
    },
    {
      name: 'chromium',
      dependencies: ["setup"],
      use: {
        ...devices['Desktop Chrome'],
        headless: true,
        storageState: "./src/setup/web-loginAuth.json",
        // viewport: { width: 1440, height: 900 }
      },
    },
  ],
});
