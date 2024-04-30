const {SignUpPage} = require('./pages/SignUpPage');
const {HomePage} = require("./pages/HomePages");
const {SignInPage} = require("./pages/SignInPage");

exports.PageObjectManager = class PageObjectManager {
    constructor(page) {
        this.page = page;
    }

    setPage(page) {
        this.page = page;
    }

    getHomePage() {
        return new HomePage(this.page);
    }
    getSignUpPage() {
        return new SignUpPage(this.page);
    }

    getSignInPage() {
        return new SignInPage(this.page);
    }


}