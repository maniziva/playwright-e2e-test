import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables from the specified file or default to './src/env/staging.env'
const envFile = process.env.ENV_FILE || './src/env/staging.env';
dotenv.config({ path: envFile });

export default defineConfig({
  //globalSetup: require.resolve('./src/setup/web-global-setup'),
  timeout: 30000,
  //globalTimeout: 5000,
  testDir: './test/interview-practice/practice/',
  testIgnore: './test/web-test/ignore/*',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : 4, // Ensure 4 workers for local execution
  reporter: [['html'], ['allure-playwright'], ['junit', { outputFile: 'test-results/junit-report.xml' }]],
  use: {
    trace: "on",//"retain-on-failure", //"on", "off", "retain-on-failure",
    video: "retain-on-failure", //"on", "off", "retain-on-failure",
    screenshot:  "on", //"off", "only-on-failure",
    ///storageState: "./src/setup/web-loginAuth.json",
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
    //   name: 'firefox',
    //   use: {
    //     ...devices['Firefox'],
    //     headless: true,
    //     viewport: { width: 1440, height: 900 } // Desktop Chrome viewport
    //   },
    // }
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
