const {Builder} = require('selenium-webdriver');
const LoginPage = require ('../WebComponent/LoginPage');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseURL = process.env.BASE_URL;

const screenshotDir = './screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe('TestCase 2 [login] #Smoke', function(){
    this.timeout(40000);
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
        //Run tanpa membuka chorome dengan menggunakan --headless
        driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();
    });

    //test Suite dimulai dengan apa, setiap melakukan tes
    beforeEach(async function () {
        const loginPage = new LoginPage(driver);
        await loginPage.navigate(baseURL);
        await loginPage.login('haha', 'hihi');
    });

    //Assertion atau validasi
    it('Error message appears for invalid credentials', async function () {
        const loginPage = new LoginPage(driver);
        const errorMessage = await loginPage.getErrorMessage();
        assert.strictEqual(errorMessage, 'Epic sadface: Username and password do not match any user in this service', 'Expected error message doesn`t match');
    });

    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`
        fs.writeFileSync(filepath, screenshot, 'base64');
        console.log('Screenshot succesfully saved');
    });

    after(async function () {
        await driver.quit()
    });
});