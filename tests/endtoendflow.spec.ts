import { test, expect } from '../fixtures/pageFixtures';
import users from '../test-data/users.json';
import products from '../test-data/products.json';
import { InventoryPage } from '../pages/InventoryPage';
import { HeaderComponent } from '../pages/components/HeaderComponent';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOne } from '../pages/CheckoutStepOne';
import { CheckoutStepTwo } from '../pages/CheckoutStepTwo';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

test('user can complete checkout end to end', async ({ page, loginPage }) => {
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login(users.standardUser.username, users.standardUser.password);

    const inventoryPage = new InventoryPage(page);
    const headerComponent = new HeaderComponent(page);
    const cartPage = new CartPage(page);
    const checkoutStepOne = new CheckoutStepOne(page);
    const checkoutStepTwo = new CheckoutStepTwo(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);
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

    await checkoutStepOne.fillInfo('John', 'Doe', '12345');
    await checkoutStepOne.continueToStepTwo();

    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

    for (const product of addedProducts) {
        await expect(checkoutStepTwo.productQuantity(product.name)).toHaveText('1');
        await expect(checkoutStepTwo.productPrice(product.name)).toHaveText(product.price);
    }

    const expectedItemTotal = addedProducts.reduce(
        (sum, product) => sum + parseFloat(product.price.replace('$', '')),
        0
    );
    await expect(checkoutStepTwo.subtotalLabel()).toHaveText(`Item total: $${expectedItemTotal.toFixed(2)}`);

    await checkoutStepTwo.finish();

    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    await expect(checkoutCompletePage.completeHeader()).toHaveText('Thank you for your order!');
});
