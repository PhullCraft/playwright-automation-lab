import { Page } from '@playwright/test';

export class CheckoutStepTwo {
  constructor(private page: Page) {}

  pageTitle() {
    return this.page.locator('[data-test="title"]');
  }

  productQuantity(productName: string) {
    return this.page
      .locator('[data-test="inventory-item"]')
      .filter({ hasText: productName })
      .locator('[data-test="item-quantity"]');
  }

  productPrice(productName: string) {
    return this.page
      .locator('[data-test="inventory-item"]')
      .filter({ hasText: productName })
      .locator('[data-test="inventory-item-price"]');
  }

  subtotalLabel() {
    return this.page.locator('[data-test="subtotal-label"]');
  }

  taxLabel() {
    return this.page.locator('[data-test="tax-label"]');
  }

  totalLabel() {
    return this.page.locator('[data-test="total-label"]');
  }

  finishButton() {
    return this.page.locator('[data-test="finish"]');
  }

  cancelButton() {
    return this.page.locator('[data-test="cancel"]');
  }

  async finish() {
    await this.finishButton().click();
  }
}
