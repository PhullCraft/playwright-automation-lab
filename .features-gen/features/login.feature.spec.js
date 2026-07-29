// Generated from: features\login.feature
import { test } from "../../fixtures/pageFixtures.ts";

test.describe('Login', () => {

  test('User logs in with valid credentials', async ({ Given, When, Then, loginPage, page }) => { 
    await Given('the user is on the login page', null, { page }); 
    await When('the user logs in with "standard_user" and "secret_sauce"', null, { loginPage }); 
    await Then('the user should see the products page', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given the user is on the login page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When the user logs in with \"standard_user\" and \"secret_sauce\"","stepMatchArguments":[{"group":{"start":22,"value":"\"standard_user\"","children":[{"start":23,"value":"standard_user","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":42,"value":"\"secret_sauce\"","children":[{"start":43,"value":"secret_sauce","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then the user should see the products page","stepMatchArguments":[]}]},
]; // bdd-data-end