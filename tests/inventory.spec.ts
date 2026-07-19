import { test, expect } from '../fixtures/pageFixtures';
import users from '../test-data/users.json';
import products from '../test-data/products.json';
import { InventoryPage } from '../pages/InventoryPage';
import { HeaderComponent } from '../pages/components/HeaderComponent';

test('user can add multiple products to cart', async ({ page, loginPage }) => {
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login(users.standardUser.username, users.standardUser.password);

    const inventoryPage = new InventoryPage(page);
    const headerComponent = new HeaderComponent(page);
    const addedProducts: { name: string; price: string }[] = [];

    for (const productName of products) {
        const price = await inventoryPage.getProductPrice(productName);
        await inventoryPage.addProductToCart(productName);
        addedProducts.push({ name: productName, price });

        await expect(inventoryPage.productAddButton(productName)).toHaveText('Remove');

        const cartCount = await headerComponent.getCartCount();
        expect(cartCount).toBe(addedProducts.length);
    }

    console.log(addedProducts);
});
