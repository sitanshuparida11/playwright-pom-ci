class SignupModal {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#sign-username');
    this.passwordInput = page.locator('#sign-password');
    this.signupBtn = page.locator('#signInModal').getByRole('button', { name: 'Sign up' });
  }

  async signup(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    // Sign up triggers an alert; capture and accept it
    const [dialog] = await Promise.all([
      this.page.waitForEvent('dialog'),
      this.signupBtn.click()
    ]);
    await dialog.accept();
    // small wait for modal to close
    await this.page.waitForTimeout(500);
  }
}

module.exports = { SignupModal };
