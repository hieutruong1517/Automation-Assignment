const { expect } = require('@playwright/test');
const { errors } = require("playwright");

exports.MasterPage = class MasterPage {
    constructor(page) {
        this.page = page;
        //navbar locator
    }
    async sleep(seconds) {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }

    async getAttributeByJSWithClassName(className, attr) {
        console.log(className)
        await this.page.evaluate(() => {
            const imgElement = document.querySelector(className);
            return imgElement ? imgElement.getAttribute(attr) : null;
        });
    }
    async navigateToHomePage() {
        await this.page.goto("/");
    }
    async navigateByURL(URL) {
        await this.page.goto(URL);
    }

    async logOut() {
        try {
            let welcome = await this.page.locator("//span[contains(text(), 'Welcome, ')]").first();
            let customerToggleBtn = await this.page.locator("//li[contains(@class, 'customer-welcome')]//button").first();
            await customerToggleBtn.click();
            await this.page.locator("//a[contains(text(), 'Sign Out ')]").first().click();
            await expect(this.page.url()).toContain("account/logoutSuccess/");
        } catch (e) {
            //If user is already logged out
            let isVisible = await this.page.locator("//a[contains(text(), 'Sign In')]").first().isVisible();
            if (isVisible) {
                console.log("Already logged out")
            } else {
                console.error("Error Sign Out: ", e)
            }
        }
    }
}
