import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  cartTitle() {
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

  removeButton(productName: string) {
    return this.page
      .locator('[data-test="inventory-item"]')
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Remove' });
  }

  checkoutButton() {
    return this.page.getByRole('button', { name: 'Checkout' });
  }
}