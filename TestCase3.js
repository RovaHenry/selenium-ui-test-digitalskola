const {Builder} = require('selenium-webdriver');
const LoginPage = require ('./WebComponent/LoginPage');
const DashboardPage = require ('./WebComponent/DashboardPage');
const CartPage = require ('./WebComponent/CartPage');
const assert = require('assert');

describe('TestCase 1', function(){
    this.timeout(40000);
    let driver;

    //Run setiap mulai test, satu kali saja paling awal
    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    //User login
    beforeEach(async function () {
        const loginPage = new LoginPage(driver);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    //Assertion atau validasi
    it('Login succesfully and verify dashboard', async function () {
        const dashboardPage = new DashboardPage(driver);
        const title = await dashboardPage.isOnDashboard();
        assert.strictEqual(title, 'Products', 'Expected dashboard title to be Products');
    });

    it('Item has been added to the cart', async function () {
        const cartPage = new CartPage(driver);
        await cartPage.item();
        await cartPage.cart();
        const titleitem = await cartPage.isOnCart();
        assert.strictEqual(titleitem, 'Sauce Labs Backpack', 'Expected item to be in the cart')
    })

    after(async function () {
        driver.quit();
    });

});