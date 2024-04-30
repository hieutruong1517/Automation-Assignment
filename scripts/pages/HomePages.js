const { expect } = require('@playwright/test');
const { MasterPage } = require('./MasterPage');
import {JsonDataManager} from '../utils/JsonDataManager'
const {errors} = require("playwright");

let jsonFile = new JsonDataManager();

//Only verify the UI elements are displayed or not.
exports.HomePage = class HomePage extends MasterPage {
    constructor(page) {
        super(page);
        this.signInBtn = page.locator("//a[contains(text(), 'Sign In')]").first();
        this.createAnAccountBtn = page.locator("//a[contains(text(), 'Create an Account')]").first();
        this.whatNews = page.locator("#ui-id-3");
        this.women = page.locator("#ui-id-4");
        this.men = page.locator("#ui-id-5");
        this.gear = page.locator("#ui-id-6");
        this.training = page.locator("#ui-id-7");
        this.sale = page.locator("#ui-id-8");
        this.searchInput = page.locator("#search");
        this.cart = page.locator("//div[@class='minicart-wrapper']");
        this.mainContent = page.locator("#maincontent");
        this.productList = page.locator("//div[@class='products-grid grid']");
    }
    async clickSignInBtn() {
        await this.signInBtn.click();
    }
    async clickCreateAnAccountBtn() {
        await this.createAnAccountBtn.click();
    }

    async verifyNavBarDisplay() {
        await expect(this.whatNews).toBeVisible();
        await expect(this.women).toBeVisible();
        await expect(this.men).toBeVisible();
        await expect(this.gear).toBeVisible();
        await expect(this.training).toBeVisible();
        await expect(this.sale).toBeVisible();
    }

    async verifyMaincontentAndProductDisplay() {
        await expect(this.mainContent).toBeVisible();
        await expect(this.productList).toBeVisible();
    }

    async verifySearchDisplay() {
        await expect(this.searchInput).toBeVisible();
    }

    async verifyCartDisplay() {
        await expect(this.cart).toBeVisible();

    }



    async verifyProductIsDisplayed() {
        let product = this.page.locator("//li[@class=\"product-item\"]").first();
        await product.hover();
        await expect(this.page.locator("//button[@title=\"Add to Cart\"]").first()).toBeVisible();
        await expect(this.page.locator("//a[@title=\"Add to Wish List\"]").first()).toBeVisible();
        await expect(this.page.locator("//a[@title=\"Add to Compare\"]").first()).toBeVisible();

        let blueColor = this.page.locator("#option-label-color-93-item-50").first();
        let orangeColor = this.page.locator("#option-label-color-93-item-56").first();
        let purpleColor = this.page.locator("#option-label-color-93-item-57").first();
        let productImage = this.page.locator("//li[@class=\"product-item\"][1]//img[@class=\"product-image-photo\"]").first();
        let imageLoading = this.page.locator("//img[@class=\"product-image-photo swatch-option-loading\"]").first();

        await blueColor.click();
        await imageLoading.isEnabled();
        await imageLoading.isHidden();
        let src = await productImage.getAttribute("src");
        await expect(src).toEqual(expect.stringContaining("blue"));

        await orangeColor.click();
        await imageLoading.isEnabled();
        await imageLoading.isHidden();
        src = await productImage.getAttribute("src");
        await expect(src).toEqual(expect.stringContaining("orange"));

        await purpleColor.click();
        await imageLoading.isEnabled();
        await imageLoading.isHidden();
        src = await productImage.getAttribute("src");
        await expect(src).toEqual(expect.stringContaining("purple"));
    }



}