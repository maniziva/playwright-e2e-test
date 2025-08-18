// example.spec.js
import { test, expect } from '@playwright/test';
import logger from 'src/utils/logger';

test('Login Test', async ({ page }) => {
logger.info(`Starting ${test.info().title}`);
  await page.goto('https://your-site.com');
  logger.debug('Navigated to homepage');
  // logger.warn removed to avoid duplicate logging

  //... your test steps ...

  // Log results and errors
  try {
    await expect(page).toHaveTitle(/Login/);
    logger.info('Login page loaded as expected');
  } catch (err) {
    logger.error(`Failed to load login page: ${err.message}`);
  }


  logger.info(`Completed ${test.info().title}`);
});
