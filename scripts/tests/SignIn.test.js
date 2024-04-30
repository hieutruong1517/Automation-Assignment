import { test } from "@playwright/test";
import { PageObjectManager } from '../PageObjectManager';
import {JsonDataManager} from '../utils/JsonDataManager'
import { allure } from "allure-playwright";
import { Severity } from "allure-js-commons";

const PageManager = new PageObjectManager();
let jsonFile = new JsonDataManager();
let user = jsonFile.readDataWithFileName("users.json");
user = user.validUsers[0];

test.describe('@e2e Verify Customer Login function', () => {

    let homepage;
    let signInPage;
    test.beforeEach(async ({page, baseURL}) => {
        PageManager.setPage(page);
        homepage = PageManager.getHomePage();
        signInPage = PageManager.getSignInPage();

        await homepage.navigateToHomePage();
        await homepage.clickSignInBtn();
    })

    test('TC_01 - Verify that user can sign in successfully with valid credentials', async ({page}) => {
        await allure.description("TC_01 - Verify that user can sign in successfully with valid credentials");
        await allure.feature("Sign-in");
        await allure.severity(Severity.CRITICAL);

        await signInPage.login();
        await signInPage.isLoggedIn();
    })
    test("TC_02 - Verify that user error is displayed when user enter invalid credentials", async ({page}) => {
        await allure.description("TC_02 - Verify that user error is displayed when user enter invalid credentials");
        await allure.feature("Sign-in");
        await allure.severity(Severity.CRITICAL);

        await signInPage.enterEmail("invalidEmail");
        await signInPage.clickSignIn();
        await signInPage.verifyIncorrectEmailMessage();

        await signInPage.enterEmail("");
        await signInPage.enterEmail(user.email);
        await signInPage.enterPassword("invalidPassword");
        await signInPage.clickSignIn();
        await signInPage.verifyIncorrectPassword();
    })
})