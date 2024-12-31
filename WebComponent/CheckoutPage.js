const {By} = require('selenium-webdriver');

class CheckoutPage {
    constructor(driver) {
        this.driver = driver;
        this.checkoutInput = By.xpath("//button[@id='checkout']");
        this.firstnameInput = By.id("first-name");
        this.lastnameInput = By.id("last-name");
        this.postalInput = By.id("postal-code");
        this.continueInput = By.xpath("//input[@id='continue']");
        this.finishInput = By.xpath("//button[@id='finish']");
    }
    async checkoutButton() {
        await this.driver.findElement(this.checkoutInput).click();
    }
    async fill(firstname, lastname, postal) {
        await this.driver.findElement(this.firstnameInput).sendKeys(firstname);
        await this.driver.findElement(this.lastnameInput).sendKeys(lastname);
        await this.driver.findElement(this.postalInput).sendKeys(postal);
        await this.driver.findElement(this.continueInput).click();
        
    }
    async isOnPayment() {
        const price = await this.driver.findElement(By.css("[data-test='total-info-label']"));
        return price.getText();
    }
    async isDone() {
        await this.driver.findElement(this.finishInput).click();
        const title = await this.driver.findElement(By.xpath("//span[@class='title']"));
        return title.getText();
    }
    
}

module.exports = CheckoutPage;