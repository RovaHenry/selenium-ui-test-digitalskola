const {By} = require('selenium-webdriver');

class CartPage {
    constructor(driver) {
        this.driver = driver;
        this.addItem = By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']");
        this.buttonCart = By.css(".shopping_cart_link");        
    }
    async item() {
        await this.driver.findElement(this.addItem).click();
    }
    async cart() {
        await this.driver.findElement(this.buttonCart).click();
    }
    async isOnCart() {
        const title = await this.driver.findElement(By.xpath("//span[@class='title']"));
        return title.getText();
    }
    
}

module.exports = CartPage;