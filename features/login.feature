Feature: Login

  Scenario: User logs in with valid credentials
    Given the user is on the login page
    When the user logs in with "standard_user" and "secret_sauce"
    Then the user should see the products page