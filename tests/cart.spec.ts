import { test, expect } from '../fixtures/pageFixtures';
import users from '../test-data/users.json';
import products from '../test-data/products.json';
import { InventoryPage } from '../pages/InventoryPage';
import { HeaderComponent } from '../pages/components/HeaderComponent';
import { CartPage } from '../pages/CartPage';

test('user can verify cart contents and proceed to checkout', async ({ page, loginPage }) => {
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login(users.standardUser.username, users.standardUser.password);

    const inventoryPage = new InventoryPage(page);
    const headerComponent = new HeaderComponent(page);
    const cartPage = new CartPage(page);
    const addedProducts: { name: string; price: string }[] = [];

    for (const productName of products) {
        const price = await inventoryPage.getProductPrice(productName);
        await inventoryPage.addProductToCart(productName);
        addedProducts.push({ name: productName, price });
    }

    await headerComponent.goToCart();

    await expect(cartPage.cartTitle()).toHaveText('Your Cart');

    for (const product of addedProducts) {
        await expect(cartPage.productQuantity(product.name)).toHaveText('1');
        await expect(cartPage.productPrice(product.name)).toHaveText(product.price);
    }

    await cartPage.checkoutButton().click();

    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
});