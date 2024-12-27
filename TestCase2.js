const {Builder} = require('selenium-webdriver');
const LoginPage = require ('./WebComponent/LoginPage');
const assert = require('assert');

describe('TestCase 1', function(){
    this.timeout(40000);
    let driver;

    //Run setiap mulai test, satu kali saja paling awal
    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    //test Suite dimulai dengan apa, setiap melakukan tes
    beforeEach(async function () {
        const loginPage = new LoginPage(driver);
        await loginPage.navigate();
        await loginPage.login('haha', 'hihi');
    });

    //Assertion atau validasi
    it('Error message appears for invalid credentials', async function () {
        const loginPage = new LoginPage(driver);
        const errorMessage = await loginPage.getErrorMessage();
        assert.strictEqual(errorMessage, 'Epic sadface: Username and password do not match any user in this service', 'Expected error message doesn`t match');
    });

    after(async function () {
        await driver.quit()
    });
});