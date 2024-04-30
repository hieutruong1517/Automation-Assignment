import { test } from "@playwright/test";
import { PageObjectManager } from '../PageObjectManager';
import {JsonDataManager} from '../utils/JsonDataManager'
import { allure } from "allure-playwright";
import { Severity } from "allure-js-commons";

const PageManager = new PageObjectManager();
const TestData = new JsonDataManager();
let users = TestData.readDataWithFileName("users.json");

test.describe('@e2e Verify admin can create a new account', () => {
    let createNewAccountPage;
    let homepage;
    test.beforeEach(async ({page, baseURL}) => {
        PageManager.setPage(page);
        homepage = PageManager.getHomePage();
        createNewAccountPage = PageManager.getSignUpPage();

        await homepage.navigateToHomePage();
        await homepage.clickCreateAnAccountBtn();
    })

    test('TC_01 - Verify that admin can sign up successfully', async ({ page }) => {
        await allure.description("TC_01 - Verify that admin can sign up with valid credentials successfully");
        await allure.feature("Sign-Up");
        await allure.severity(Severity.CRITICAL);

        let validUser = createNewAccountPage.generateRandomValidUserAccount();
        await createNewAccountPage.enterAllInformations(validUser.firstName, validUser.lastName, validUser.email, validUser.password, validUser.password);
        await createNewAccountPage.clickCreateAccountBtn();
    });

    test('TC_02 - Verify that error message is displayed when required fields are empty', async ({page})=> {
        await allure.description("TC_02 - Verify that error message is displayed when required fields are empty");
        await allure.feature("Sign-Up");
        await allure.severity(Severity.CRITICAL);

        await createNewAccountPage.enterAllInformations("", "", "", "", "");
        await createNewAccountPage.clickCreateAccountBtn();
        await createNewAccountPage.verifyRequiredField("First Name");
        await createNewAccountPage.verifyRequiredField("Last Name");
        await createNewAccountPage.verifyRequiredField("Email");
        await createNewAccountPage.verifyRequiredField("Password");
        await createNewAccountPage.verifyRequiredField("Confirm Password");
    })

    test('TC_03 - Verify that error message is dipslayed when user enter invalid email address', async({page}) => {
        await allure.description("TC_03 - Verify that error message is dipslayed when user enter invalid email address");
        await allure.feature("Sign-Up");
        await allure.severity(Severity.NORMAL);

        await createNewAccountPage.enterEmail("invalidEmail");
        await createNewAccountPage.clickCreateAccountBtn();
        await createNewAccountPage.verifyEmailError();

        //Enter duplicate email
        let duplicateEmailUser = users.validUsers[0];
        await createNewAccountPage.enterAllInformations(
            duplicateEmailUser.firstName, duplicateEmailUser.lastName, duplicateEmailUser.email, duplicateEmailUser.password, duplicateEmailUser.password);
        await createNewAccountPage.clickCreateAccountBtn();
        await createNewAccountPage.verifyDuplicatedEmailError();
    })

    test('TC_04 - Verify that error message is displayed when user enter invalid password', async({page}) => {
        await allure.description("TC_04 - Verify that error message is displayed when user enter invalid password");
        await allure.feature("Sign-Up");
        await allure.severity(Severity.NORMAL);

        await createNewAccountPage.enterPassword(createNewAccountPage.generateRandomInvalidPasswordAndEmail(3))
        await createNewAccountPage.verifyPasswordLengthErrorMsg();
        await createNewAccountPage.enterPassword("");
        await createNewAccountPage.enterPassword(createNewAccountPage.generateRandomInvalidPasswordAndEmail(9))
        await createNewAccountPage.verifyPasswordCharacterErrorMessage()
        await createNewAccountPage.enterConfirmationPassword(createNewAccountPage.generateRandomInvalidPasswordAndEmail(3))
        await createNewAccountPage.clickCreateAccountBtn();
        await createNewAccountPage.verifyInvalidConfirmPasswordErrorMessage();
    })

    test("TC_05 - Verify password strength is displayed correctly", async ( {page} ) => {
        await allure.description("TC_05 - Verify that error message is displayed when user enter invalid password length");
        await allure.feature("Sign-Up");
        await allure.severity(Severity.NORMAL);

        await createNewAccountPage.enterPassword(createNewAccountPage.generateRandomInvalidPasswordAndEmail(4))
        await createNewAccountPage.verifyPasswordStrengthMeter("Weak");

        await createNewAccountPage.clearPasswordInput();
        await createNewAccountPage.enterPassword("Medium12")
        await createNewAccountPage.verifyPasswordStrengthMeter("Medium");

        await createNewAccountPage.clearPasswordInput();
        await createNewAccountPage.enterPassword("Password1")
        await createNewAccountPage.verifyPasswordStrengthMeter("Strong");

        await createNewAccountPage.clearPasswordInput();
        await createNewAccountPage.enterPassword("VeryStrongPassword123")
        await createNewAccountPage.verifyPasswordStrengthMeter("Very Strong");

        await createNewAccountPage.clearPasswordInput();
        await createNewAccountPage.verifyPasswordStrengthMeter("No Password");
    })
});


