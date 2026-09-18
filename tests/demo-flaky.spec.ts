import { test, expect } from '@playwright/test';

test('flaky demo - click too early', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  // Fill and click normally
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Deliberately flaky: unrealistically tight timeout (100ms)
  // Real navigation + rendering rarely completes this fast,
  // so this assertion will likely fail most of the time
  //await expect(page.locator('.inventory_list')).toBeVisible({ timeout: 1 });
   await expect(page.locator('.this-element-does-not-exist')).toBeVisible({ timeout: 3000 });
});