import { Page } from '@playwright/test';

export class OpenAccount {
	private page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async goTo() {
		await this.page.goto('http://parabank.parasoft.com/parabank/openaccount.htm');
		// Debug: print page HTML after navigation
		const html = await this.page.content();
		console.log('OpenAccount.goTo() page HTML:', html);
	}

	async selectAccountType(typeValue: string) {
		try {
			await this.page.waitForSelector('select#type', { state: 'visible', timeout: 10000 });
			await this.page.selectOption('select#type', typeValue);
		} catch (error) {
			const html = await this.page.content();
			console.log('OpenAccount.selectAccountType() page HTML:', html);
			throw error;
		}
	}

	async submitForm() {
		await this.page.getByRole('button', { name: 'Open New Account' }).click();
	}

	async getNewAccountId(): Promise<string> {
		return this.page.locator('#newAccountId').innerText();
	}

	async getFromAccountId(): Promise<string> {
		return this.page.locator('#fromAccountId').innerText();
	}
}
