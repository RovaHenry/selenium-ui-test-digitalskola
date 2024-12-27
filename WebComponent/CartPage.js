const {By} = require('selenium-webdriver');

class CartPage {
    constructor(driver) {
        this.driver = driver;
        this.addItem = By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']");
        this.buttonCart = By.xpath("//div[@id='shopping_cart_container']/a[1]");
    }
    async item() {
        await this.driver.findElement(this.addItem).click();
    }
    async cart() {
        await this.driver.findElement(this.buttonCart).click();
    }
    async isOnCart() {
        const titleitem = await this.driver.findElement(By.className('inventory_item_name'));
        return titleitem.getText();
    }
    
}

module.exports = CartPage;