import { Page } from '@playwright/test';

export class HeaderComponent {
  constructor(private page: Page) {}

  async goToCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }

  async getCartCount(): Promise<number> {
    const badge = this.page.locator('[data-test="shopping-cart-badge"]');
    const text = await badge.textContent();
    return text ? parseInt(text, 10) : 0;
  }
}