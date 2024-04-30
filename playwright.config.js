import { testPlanFilter } from "allure-playwright/dist/testplan";
import {defineConfig} from "playwright/test";
import {devices} from "playwright";

const config = {
    // ...
    use: {
      headless: !true,
        browserName: "chromium",
        screenshot: "on",
        baseURL: "https://magento.softwaretestingboard.com/",
        launchOptions: {
          logger: {
              isEnabled: (name, severity) => name === 'UI Testing',
              log: (name, severity, message, args) => console.log(`${name} ${message}`)
          }
        }
    },
    grep: testPlanFilter(),
    reporter: "allure-playwright",
};
module.exports = config;
