class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.signupLink = page.getByText('Sign up');
    this.loginLink = page.getByText('Log in');
    this.cartLink = page.getByText('Cart');
  }

  async navigate(url) {
    await this.page.goto(url);
  }

  async openSignup() {
    await this.signupLink.click();
    await this.page.waitForSelector('#signInModal', { state: 'visible' });
  }

  async openLogin() {
    await this.loginLink.click();
    await this.page.waitForSelector('#logInModal', { state: 'visible' });
  }

  async selectProduct(name) {
    await this.page.click(`a:has-text("${name}")`);
    await this.page.waitForSelector('.name');
  }

  async goToCart() {
    await this.cartLink.click();
    await this.page.waitForURL('**/cart.html');
  }

  async getLoggedUser() {
    return await this.page.locator('#nameofuser').innerText();
  }
}

module.exports = { HomePage };
