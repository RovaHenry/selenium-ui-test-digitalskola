const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');

async function sauceDemoLoginTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get("https://www.saucedemo.com/");

        //Masukkan Username dan Password
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.xpath("//input[@id='password']")).sendKeys('secret_sauce')
        
        //Click button login
        await driver.findElement(By.xpath("//input[@id='login-button']")).click();

        // Tunggu sampai dashboard dimuat (misalnya, berdasarkan elemen unik)
        let dashboardElement = await driver.wait(
            until.elementLocated(By.id('inventory_container')), 5000);
        
        //Memastikan kita di dashboard
        let isDashboardDisplayed = await dashboardElement.isDisplayed();
        assert.strictEqual(isDashboardDisplayed, true, "Dashboard isn't visible");
        
        console.log('Validasi berhasil, pengguna berada di dashboard.');

        //menambahkan item di cart
        await driver.findElement(By.xpath("//div[.='Sauce Labs Backpack']")).click();
        await driver.findElement(By.xpath("//button[@id='add-to-cart']")).click();

        //Memastikan item sukses ditambahkan ke cart
        await driver.findElement(By.xpath("//a[.='1']")).click();
        let validateItem = await driver.findElement(By.xpath("//div[.='Sauce Labs Backpack']")).getText();
        assert.strictEqual(validateItem.includes('Sauce Labs Backpack'), true, "Cart is empty");

    } finally {
        await driver.quit();
    }
}

sauceDemoLoginTest();