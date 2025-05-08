import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables from the specified file or default to './src/env/staging.env'
const envFile = process.env.ENV_FILE || './src/env/staging.env';
dotenv.config({ path: envFile });

export default defineConfig({
  //globalSetup: require.resolve('./src/setup/web-global-setup'),
  timeout: 60000,
  testDir: './test/interview-practice/after',
  outputDir: 'test-results/',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 4,
  reporter: [['html'], ['allure-playwright'], ['junit', { outputFile: 'test-results/junit-report.xml' }]],
  use: {
    trace: "retain-on-failure", //"on", "off", "retain-on-failure",
    video: "retain-on-failure", //"on", "off", "retain-on-failure",
    screenshot: "on"//"only-on-failure", //"on", "off", "only-on-failure",
    //storageState: "./src/setup/web-loginAuth.json",
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: true,
        viewport: { width: 1440, height: 900 } // Desktop Chrome viewport
      },
    },
    // {
    //   name: 'iphone',
    //   use: {
    //     ...devices['iPhone 13'],
    //     headless: true,
    //     viewport: { width: 390, height: 844 } // iPhone 13 viewport
    //   },
    // }
  ],
});
