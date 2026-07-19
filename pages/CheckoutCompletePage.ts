import { Page } from '@playwright/test';

export class CheckoutCompletePage {
  constructor(private page: Page) {}

  pageTitle() {
    return this.page.locator('[data-test="title"]');
  }

  completeHeader() {
    return this.page.locator('[data-test="complete-header"]');
  }

  completeText() {
    return this.page.locator('[data-test="complete-text"]');
  }

  backHomeButton() {
    return this.page.locator('[data-test="back-to-products"]');
  }
}
