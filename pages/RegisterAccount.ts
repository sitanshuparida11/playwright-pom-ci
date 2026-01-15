
import { Locator, Page, expect } from "@playwright/test";
import { faker } from '@faker-js/faker';


export class RegisterAccount{
    readonly page:Page;
    readonly firstName:Locator;
    readonly lastName:Locator;
    readonly streetAddress:Locator;
    readonly city:Locator;
    readonly state:Locator;
    readonly zipCode:Locator;
    readonly phoneNumber:Locator;
    readonly ssn:Locator;
    readonly username:Locator;
    readonly password:Locator;
    readonly confirmPassword:Locator;
    readonly registerButton:Locator;

    constructor(page:Page){
        this.page=page;
        this.firstName=page.locator('[id="customer.firstName"]');
        this.lastName=page.locator('[id="customer.lastName"]');
        this.streetAddress=page.locator('[id="customer.address.street"]');
        this.city=page.locator('[id="customer.address.city"]');
        this.state=page.locator('[id="customer.address.state"]');
        this.zipCode=page.locator('[id="customer.address.zipCode"]');
        this.phoneNumber=page.locator('[id="customer.phoneNumber"]');
        this.ssn=page.locator('[id="customer.ssn"]');
        this.username=page.locator('[id="customer.username"]');
        this.password=page.locator('[id="customer.password"]');
        this.confirmPassword=page.locator('#repeatedPassword');
        this.registerButton=page.getByRole('button', { name: 'Register' });
    }

    async fillForm() {
        await this.firstName.fill(faker.person.firstName());
        await this.lastName.fill(faker.person.lastName());
        await this.streetAddress.fill(faker.location.streetAddress());
        await this.city.fill(faker.location.city());
        await this.state.fill(faker.location.state());
        await this.zipCode.fill(faker.location.zipCode());
        await this.phoneNumber.fill(faker.phone.number());
        await this.ssn.fill(faker.string.numeric(4));
        const userName = faker.internet.username();
        await this.username.fill(userName);
        const password = faker.internet.password({ length: 8 });
        await this.password.fill(password);
        await this.confirmPassword.fill(password);
    }

    async goTo() {
        await this.page.goto('https://parabank.parasoft.com/parabank/register.htm');
    }

    async fillFormWithCredentials(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.confirmPassword.fill(password);
    }
    async Submit(){
        await this.registerButton.click();
    }

    async VerifyAccountCreation(){
        const welcomeHeader = await this.page.locator('h1').textContent();
        const successMessage = await this.page.locator('#rightPanel').textContent();

        if (!welcomeHeader?.includes('Welcome poken')) {
            throw new Error('Account creation failed: Welcome message not found.');
        }
        if (!successMessage?.includes('Your account was created successfully. You are now logged in.')) {
            throw new Error('Account creation failed: Success message not found.');
        }
        // Use Playwright's expect API for assertions
        await expect(this.page.locator('h1')).toContainText('Welcome poken');
        await expect(this.page.locator('#rightPanel')).toContainText('Your account was created successfully. You are now logged in.');
    }   
}