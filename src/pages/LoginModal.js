class LoginModal {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#loginusername');
    this.passwordInput = page.locator('#loginpassword');
    this.loginBtn = page.locator('#logInModal').getByRole('button', { name: 'Log in' });
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
    // Wait for modal to close or welcome text to appear
    await this.page.waitForTimeout(1000);
  }
}

module.exports = { LoginModal };
