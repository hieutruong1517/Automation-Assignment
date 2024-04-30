# QA-Automation-Assignment-Droppi
I use Playwright with Javascript in this project. You can open the 'scripts' folder to see how it is structured.

**How to run:**
After cloning the project into your computer, you will need to:
1. Open CMD
2. Run npm install
3. Run npx playwright test

**How to generate the test report**
1. Open CMD
2. Run allure generate ./allure-results --clean
3. Run allure open allure-report
- You can run the current report on this repo by run "allure open allure-report" in CMD
  
- If you want to change the browser, go to playwright.config.js, under **browserName: "chromium",**, and change it to "firefox" or "webkit" as you prefer.
- I've set the headless option is false. You can change it in playwright.config.js.
- If you have any questions, feel free to ask me through hieutruong1517@gmail.com or text me through my LinkedIn: https://www.linkedin.com/in/trung-hi%E1%BA%BFu-tr%C6%B0%C6%A1ng-0534b625a/
![image](https://github.com/hieutruong1517/Automation-Assignment/assets/120099228/43303ff4-4e85-4dcd-b3d4-6f1a4c529d6e)
