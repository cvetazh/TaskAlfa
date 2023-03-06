const { chromium } = require('@playwright/test');
import { user1 } from './TestData/userManager';

module.exports = async config => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ignoreHTTPSErrors: true});
  await page.goto("https://enotes.pointschool.ru/login");
  await page.locator('#loginform-username').type(user1.login);
  await page.locator('#loginform-password').type(user1.password);
  await page.locator('[name="login-button"]').click();
  await page.waitForTimeout(1000);
  await page.waitForLoadState('networkidle');
  await page.context().storageState({path: "./storageState.json"});
  await browser.close();
}

