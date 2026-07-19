//import { test, expect } from '@playwright/test'; / ← no longer needed here, custom fixture(loginPage from ../fixtures/pageFixtures) handles it now
// import { LoginPage } from '../pages/LoginPage';  // ← no longer needed here, custom fixture(loginPage from ../fixtures/pageFixtures) handles it now
import { test, expect } from '../fixtures/pageFixtures';
import users from '../test-data/users.json';
import loginScenarios from '../test-data/loginScenarios.json';

test('user can login with valid credentials', async ({ page, loginPage }) => {
    // const loginPage = new LoginPage(page);  // ← REMOVED: fixture creates this automatically now

    await page.goto('https://www.saucedemo.com/');
    //await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});


/* /
test('Validation check for lockedout user', async ({ page, loginPage }) => {
    // const loginPage = new LoginPage(page);  // ← REMOVED: fixture creates this automatically now

    await page.goto('https://www.saucedemo.com/');
    //await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.login(users.lockedOutUser.username, users.lockedOutUser.password);
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});

test('validation while, user can login with invalid password', async ({ page, loginPage }) => {
    // const loginPage = new LoginPage(page);  // ← REMOVED: fixture creates this automatically now

    await page.goto('https://www.saucedemo.com/');
    //await loginPage.login('standard_user', 'notso_secret_sauce');
    await loginPage.login(users.invaliduser.username, users.invaliduser.password);
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('validation while, username is empty and password is empty', async ({ page, loginPage }) => {
    // const loginPage = new LoginPage(page);  // ← REMOVED: fixture creates this automatically now

    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('', '');
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');
});
*/

for (const scenario of loginScenarios){
    test(scenario.description, async ({ page, loginPage }) => {
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login(scenario.username,scenario.password);
    await expect(page.locator('[data-test="error"]')).toHaveText(scenario.expectedError);
    });
}
