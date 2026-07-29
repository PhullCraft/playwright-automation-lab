import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/pageFixtures';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

Given('the user is on the login page', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

When('the user logs in with {string} and {string}', async ({ loginPage }, username, password) => {
  await loginPage.login(username, password);
});

Then('the user should see the products page', async ({ page }) => {
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});