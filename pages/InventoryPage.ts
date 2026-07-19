import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  productAddButton(productName: string) {
    return this.page
      .locator('[data-test="inventory-item"]')
      .filter({ hasText: productName })
      .locator('button');
  }

  async addProductToCart(productName: string) {
    await this.productAddButton(productName).click();
  }

  async getProductPrice(productName: string): Promise<string> {
    const priceLocator = this.page
      .locator('[data-test="inventory-item"]')
      .filter({ hasText: productName })
      .locator('[data-test="inventory-item-price"]');
    return (await priceLocator.textContent()) ?? '';
  }
  
}