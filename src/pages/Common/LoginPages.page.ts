import { expect, Locator, Page } from "@playwright/test";

const userName = process.env.USERNAME;
const password = process.env.PASSWORD;
const baseURL = process.env.BASEURL;

if (!userName || !password || !baseURL) {
    throw new Error("Environment variables USERNAME, PASSWORD, or BASEURL are not set.");
}

export class LoginPage {
    readonly page: Page;
    readonly loginInit: Locator;
    readonly username: Locator;
    readonly password: Locator;
    readonly signIn: Locator;
    readonly noThanks: Locator;
    readonly profile: Locator;
    readonly logoutBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginInit = page.locator("#login-init"); // Replace with actual selector
        this.username = page.locator("#username"); // Replace with actual selector
        this.password = page.locator("#password"); // Replace with actual selector
        this.signIn = page.locator("#sign-in"); // Replace with actual selector
        this.noThanks = page.locator("#no-thanks"); // Replace with actual selector
        this.profile = page.locator("#profile"); // Replace with actual selector
        this.logoutBtn = page.locator("#logout-btn"); // Replace with actual selector
    }

    async login() {
        try {
            await this.loginInit.click();
            console.log("Login button was clicked");
            await this.username.fill(userName);
            console.log("User Name was entered");
            await this.signIn.click();
            console.log("SignIn button was clicked");
            await this.password.fill(password);
            console.log("Password was entered");
            await this.signIn.click();
            console.log("SignIn button was clicked");

            await this.page.waitForLoadState("load"); // Waits for the page to fully load
            console.log("Successfully logged in to " + baseURL);
        } catch (error) {
            console.error("Error during login:", error);
            throw error;
        }
    }

    async logout() {
        try {
            await this.profile.click();
            await this.logoutBtn.click();
            await expect(this.logoutBtn).toBeVisible();
            console.log("Successfully logged out.");
        } catch (error) {
            console.error("Error during logout:", error);
            throw error;
        }
    }
}