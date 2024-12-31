const {Builder, Options} = require('selenium-webdriver');
const LoginPage = require ('../WebComponent/LoginPage');
const DashboardPage = require ('../WebComponent/DashboardPage');
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

describe('TestCase 1 [login] #Regression', function(){
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
        await loginPage.login(username, password);
    });

    //Assertion atau validasi
    it('Login succesfully and verify dashboard', async function () {
        const dashboardPage = new DashboardPage(driver);
        const title = await dashboardPage.isOnDashboard();
        assert.strictEqual(title, 'Products', 'Expected dashboard title to be Products');
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