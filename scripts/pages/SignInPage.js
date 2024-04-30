const { expect } = require('@playwright/test');
const { MasterPage } = require('./MasterPage');
import {JsonDataManager} from '../utils/JsonDataManager'
const {errors} = require("playwright");

let jsonFile = new JsonDataManager();
let errorMsg = jsonFile.readDataWithFileName("ErrorMsg.json");
errorMsg = errorMsg.SignIn;

let user = jsonFile.readDataWithFileName("users.json");
user = user.validUsers[0];

exports.SignInPage = class SignInPage extends MasterPage {
    constructor(page) {
        super(page);
        this.emailInput = page.locator("#email").first();
        this.password = page.locator("#pass").first();
        this.signInBtn = page.locator("#send2").first();
        this.forgotPasswordBtn = page.locator("//a[@class=\"action remind\"]").first();

    }

    //login with a created account from users.json file
    async login() {
        await this.emailInput.fill(user.email);
        await this.password.fill(user.password);
        await this.signInBtn.scrollIntoViewIfNeeded();
        await this.signInBtn.isEnabled();
        await this.signInBtn.click();
    }

    async clickSignIn() {
        await this.signInBtn.scrollIntoViewIfNeeded();
        await this.signInBtn.isEnabled();
        await this.signInBtn.focus();
        await this.signInBtn.click();
    }
    async isLoggedIn() {
        // await expect(this.page).toHaveURL("https://magento.softwaretestingboard.com/customer/account/");
        // await expect(this.page.locator("#block-collapsible-nav")).toBeVisible();
        // await expect(this.page.locator("//div[@class=\"block block-dashboard-info\"]")).toBeVisible();
        // await expect(this.page.locator("//div[@class=\"box box-billing-address\"]")).toBeVisible();
        // await expect(this.page.locator("box box-shipping-address")).toBeVisible();
        let welcome = this.page.locator("//span[@class='logged-in']").first();
        await welcome.isVisible();
        await expect(welcome).toContainText("Welcome, t t! ");
    }

    async enterEmail(email) {
        await this.emailInput.fill(email);
    }

    async enterPassword(password) {
        await this.password.fill(password);
    }

    async verifyIncorrectEmailMessage() {
        let errorField = this.page.locator("#email-error").first();
        await errorField.isVisible();
        await expect(errorField).toHaveText(errorMsg.invalidEmail);
    }

    async verifyIncorrectPassword() {
        const errorField = await this.page.locator('div[data-bind="html: $parent.prepareMessageForHtml(message.text)"]').first();
        await errorField.isVisible();
        await expect(errorField).toHaveText(errorMsg.invalidPassword);
    }

}