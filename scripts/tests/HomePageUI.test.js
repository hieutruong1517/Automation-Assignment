import { test } from "@playwright/test";
import { PageObjectManager } from '../PageObjectManager';
import {JsonDataManager} from '../utils/JsonDataManager'
import { allure } from "allure-playwright";
import { Severity } from "allure-js-commons";

const PageManager = new PageObjectManager();
let jsonFile = new JsonDataManager();
let user = jsonFile.readDataWithFileName("users.json");
user = user.validUsers[0];

test.describe('@e2e Verify homepage dipslay', () => {
    let homepage;
    test.beforeEach(async ({page, baseURL}) => {
        PageManager.setPage(page);
        homepage = PageManager.getHomePage();
        await homepage.navigateToHomePage();
    })

    test('TC_01 - Verify the components are fully displayed', async ({page}) => {
        await allure.description("TC_01 - Verify the components are fully displayed");
        await allure.feature("Homepage display");
        await allure.severity(Severity.NORMAL);

        await homepage.verifyNavBarDisplay();
        await homepage.verifyMaincontentAndProductDisplay();
        await homepage.verifySearchDisplay();
        await homepage.verifyCartDisplay();
    })

    test('TC_02 Verify product is displayed', async({page}) => {
        await allure.description("TC_02 Verify product is displayed");
        await allure.feature("Homepage display");
        await allure.severity(Severity.NORMAL);

        await homepage.verifyProductIsDisplayed();
    })
});