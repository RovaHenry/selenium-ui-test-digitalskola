const {Builder, until} = require('selenium-webdriver');
const LoginPage = require ('../WebComponent/LoginPage');
const DashboardPage = require ('../WebComponent/DashboardPage');
const CartPage = require ('../WebComponent/CartPage');
const CheckoutPage = require ('../WebComponent/CheckoutPage');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseURL = process.env.BASE_URL;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

const screenshotDir = './screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}
describe('TestCase 4 [checkout] #Regression', function(){
    this.timeout(100000);
    let driver;

    switch (browser.toLocaleLowerCase()) {
        case 'firefox' :
            const firefox = require('selenium-webdriver/chrome');
            options = new firefox.Options();
            options.addArguments('--headless');
        case 'edge' :
            const edge = require('selenium-webdriver/chrome');
            options = new edge.Options();
            options.addArguments('--headless');
        case 'chrome' :
        default :
            const chrome = require('selenium-webdriver/chrome');
            options = new chrome.Options();
            options.addArguments('--headless');
        break;
    }
    //Run setiap mulai test, satu kali saja paling awal
    before(async function () {
        driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();
    });

    //User login
    beforeEach(async function () {
        const loginPage = new LoginPage(driver);
        await loginPage.navigate(baseURL);
        await loginPage.login(username, password);
    });

    //Assertion atau validasi
    it('Login succesfully and verify dashboard', async function () {
        const dashboardPage = new DashboardPage(driver);
        const title = await dashboardPage.isOnDashboard();
        assert.strictEqual(title, 'Products', 'Expected dashboard title to be Products');
    });

    it('Item process from cart page until checkout complete', async function () {
        //validate item in the cart
        const cartPage = new CartPage(driver);
        await cartPage.item();
        await cartPage.cart();
        const title = await cartPage.isOnCart();
        assert.strictEqual(title, 'Your Cart', 'Expected item to be in the cart');
        //fill information in the checkout page
        const infoPage = new CheckoutPage(driver);
        await infoPage.checkoutButton();
        await infoPage.fill('Agus', 'Gus', '12345');
        //validate item in the payment page
        const price = await infoPage.isOnPayment();
        assert.strictEqual(price, 'Price Total', 'Expected item to be in payment overview');
        //validate item checkout complete
        const complete = await infoPage.isDone();
        assert.strictEqual(complete, 'Checkout: Complete!', 'CheckOut Complete');
        
    });

    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`;
        fs.writeFileSync(filepath, screenshot, 'base64');
        console.log('Screenshot successfully saved');
    });

    after(async function () {
        await driver.quit();
    });
});