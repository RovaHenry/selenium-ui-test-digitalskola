const {Builder, By, Key, until} = require('selenium-webdriver');

async function exampleTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get("https://www.google.com");

        let searchBox = await driver.findElement(By.name('q'));

        await searchBox.sendKeys("Hello World!",Key.RETURN);
        await driver.wait(until.elementLocated(By.id('result-stats')), 10000);

        let title = await driver.getTitle();
        console.log(`Page Title is: ${title}`);

    } finally {
        await driver.quit();
    }
}
exampleTest();