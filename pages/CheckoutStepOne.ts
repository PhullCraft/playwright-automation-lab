import { Page } from '@playwright/test';

export class CheckoutStepOne {
  constructor(private page: Page) {}

   pageTitle() {
    return this.page.locator('[data-test="title"]');
  }

  firstNameInput() {
    return this.page.locator('[data-test="firstName"]');
  }

  lastNameInput() {
    return this.page.locator('[data-test="lastName"]');
  }

  postalCodeInput() {
    return this.page.locator('[data-test="postalCode"]');
  }

  continueButton() {
    return this.page.locator('[data-test="continue"]');
  }

  cancelButton() {
    return this.page.locator('[data-test="cancel"]');
  }

  errorMessage() {
    return this.page.locator('[data-test="error"]');
  }

  async fillInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput().fill(firstName);
    await this.lastNameInput().fill(lastName);
    await this.postalCodeInput().fill(postalCode);
  }

  async continueToStepTwo() {
    await this.continueButton().click();
  }
}
