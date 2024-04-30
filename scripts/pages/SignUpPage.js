const { expect } = require('@playwright/test');
const { MasterPage } = require('./MasterPage');
import {JsonDataManager} from '../utils/JsonDataManager'
const {errors} = require("playwright");

let jsonFile = new JsonDataManager();
let errorMsg = jsonFile.readDataWithFileName("ErrorMsg.json");
errorMsg = errorMsg.CreateNewAccount;
exports.SignUpPage = class SignUpPage extends MasterPage {
    constructor(page) {
        super(page);
        this.personalInformationTitle = page.locator("//fieldset[contains(@class, 'fieldset create info')]//legend/span");
        this.firstName = page.locator("//input[@id='firstname']");
        this.lastName = page.locator("//input[@id='lastname']");
        this.signInInformationTitle = page.locator("//fieldset[contains(@class, 'fieldset create account')]//legend/span");
        this.email = page.locator("#email_address");
        this.password = page.locator("#password");
        this.confirmPassword = page.locator("//div[contains(@class, 'field confirmation required')]//input");
        this.createAccountButton = page.locator("//button[contains(@title, 'Create an Account')]");
    }

    async navigateToSignUpByURL() {
        await this.navigateByURL("https://magento.softwaretestingboard.com/customer/account/create/");
    }

    async clickCreateAccountBtn() {
        await this.createAccountButton.scrollIntoViewIfNeeded();
        await this.createAccountButton.isEnabled();
        await this.createAccountButton.click();
    }

    async enterAllInformations(firstName, lastName, email, password, confirmPassword) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.password.fill(password);
        await this.confirmPassword.fill(confirmPassword);
    }

    async enterFirstName(firstName) {
        await this.firstName.fill(firstName);
    }

    async enterLastName(lastName) {
        await this.lastName.fill(lastName);
    }

    async enterEmail(email) {
        await this.email.fill(email);
    }

    async enterPassword(password) {
        // await this.password.fill(password + "a");
        // await this.page.keyboard.press('Backspace');
        await this.page.waitForLoadState('networkidle')
        await this.password.pressSequentially(password, {delay: 20})
        await this.password.click();
    }

    async clearPasswordInput() {
        await this.password.click();
        await this.password.fill("");
    }
    async clickPasswordInput() {
        await this.password.click();
    }

    async verifyPasswordStrengthMeter(Strength) {
        const passwordStrengthMeter = await this.page.locator('#password-strength-meter').first()
            .evaluate(el =>  window.getComputedStyle(el, ':before').width);
        const meterContainer = await this.page.locator('#password-strength-meter-container').first()
            .evaluate(el =>  window.getComputedStyle(el).width);
        const meterColor = await this.page.locator('#password-strength-meter').first()
            .evaluate(el =>  window.getComputedStyle(el, ':before').backgroundColor);
        let meterValue = (passwordStrengthMeter.slice(0, -2) * 100) / meterContainer.slice(0, -2)

        switch (Strength) {
            case "No Password":
                expect(meterValue).toEqual(100);
                expect(meterColor).toEqual('rgb(244, 244, 244)')
                break;
            case "Weak":
                expect(meterValue).toEqual(25);
                expect(meterColor).toEqual('rgb(255, 175, 174)')
                break;
            case "Medium":
                expect(meterValue).toEqual(50);
                expect(meterColor).toEqual('rgb(255, 214, 179)')
                break;
            case "Strength":
                expect(meterValue).toEqual(75);
                expect(meterColor).toEqual('rgb(197, 238, 172)')
                break;
            case "Very Strong":
                expect(meterValue).toEqual(100);
                expect(meterColor).toEqual('rgb(129, 181, 98)')
                break;
        }
    }

    async verifyDuplicatedEmailError() {
        // let errorField = this.page.locator("//div[@class=\"page messages\"]//div[@role='alert']//div/div").first();
        // let errorMsg = errorField.textContent();
        // console.log(errorMsg);
        await this.page.waitForLoadState('networkidle');
        const errorField = await this.page.locator('div[data-bind="html: $parent.prepareMessageForHtml(message.text)"]');
        await expect(errorField).toHaveText(errorMsg.duplicatedEmail);
    }

    async verifyEmailError() {
        await this.page.waitForLoadState('networkidle');
        let errorField = this.page.locator("#email_address-error");
        await errorField.isVisible();
        await expect(errorField).toHaveText(errorMsg.invalidEmail);
    }

    async verifyPasswordLengthErrorMsg() {
        let error = this.page.locator("#password-error");
        try {
            await expect(error).toHaveText(errorMsg.invalidPasswordLength);
        } catch (e) {
            console.error("Invalid email message error: " + e.toString())
        }
    }

    async verifyPasswordCharacterErrorMessage() {
        let error = this.page.locator("#password-error")
        await expect(error).toHaveText(errorMsg.invalidCharacterPassword);
    }

    async verifyInvalidConfirmPasswordErrorMessage() {
        let error = this.page.locator("#password-confirmation-error")
        await expect(error).toHaveText(errorMsg.incorrectConfirmPassword);
    }


    async verifyRequiredField(fieldName) {
        let errorField;
        switch (fieldName) {
            case "First Name":
                errorField = this.page.locator("#firstname-error");
                break;
            case "Last Name":
                errorField = this.page.locator("#lastname-error");
                break;
            case "Email":
                errorField = this.page.locator("#email_address-error");
                break;
            case "Password":
                errorField = this.page.locator("#password-error");
                await expect(this.page.locator("#password-strength-meter-label")).toContainText("No Password");
                break;
            case "Confirm Password":
                errorField = this.page.locator("#password-confirmation-error");
                break;
        }
        await expect(errorField).toContainText(errorMsg.emptyInput);
    }

    generateRandomValidUserAccount() {
        return {
            "firstName": (Math.random() + 1).toString(36).substring(5),
            "lastName": (Math.random() + 1).toString(36).substring(5),
            "email": (Math.random() + 1).toString(36).substring(5) + "@gmail.com",
            "password": (Math.random() + 1).toString(36).substring(6) + "@A."
        };
    }

    generateRandomInvalidPasswordAndEmail(length) {

        return (Math.random() + 1).toString(36).substring(2, 2 + length)
    }

    async enterConfirmationPassword(confirmPassword) {
        await this.confirmPassword.fill(confirmPassword);
    }

    async verifySignUpPageIsLoaded() {
        await this.personalInformationTitle.isVisible();
        await this.firstName.isVisible();
        await this.lastName.isVisible();
        await this.signInInformationTitle().isVisible();
        await this.email.isVisible();
        await this.password.isVisible();
        await this.confirmPassword.isVisible();
    }
    //wait for account created by check my account page is loaded
}
