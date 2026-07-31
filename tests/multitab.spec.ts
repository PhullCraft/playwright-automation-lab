import { test, expect } from '@playwright/test';

test('handle new tab opening', async ({ page, context }) => {
  // Step 1: Go to the practice page
  await page.goto('https://the-internet.herokuapp.com/windows');

  // Step 2: Click the link, and capture the new tab at the same time
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),           // start listening for a new tab
    page.click('a[href="/windows/new"]')    // this click opens the new tab
  ]);

  // Step 3: Wait for the new tab to finish loading
  await newPage.waitForLoadState();

  // Step 4: Prove we're now looking at the NEW tab's content
  console.log('New tab title:', await newPage.title());
  const newTabHeading = await newPage.textContent('h3');
  console.log('New tab heading:', newTabHeading);

  await expect(newPage.locator('h3')).toHaveText('New Window');

  // Step 5: Original tab is untouched — prove it's still there
  const originalHeading = await page.textContent('h3');
  console.log('Original tab heading:', originalHeading);
  await expect(page.locator('h3')).toHaveText('Opening a new window');

  // Step 6: Clean up
  await newPage.close();
  await page.bringToFront();
});