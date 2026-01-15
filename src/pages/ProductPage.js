class ProductPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.title = page.locator('.name');
    this.addToCartBtn = page.getByText('Add to cart');
  }

  async getTitle() {
    return (await this.title.innerText()).trim();
  }

  async addToCart() {
    // Adding to cart shows a dialog; accept it
    const [dialog] = await Promise.all([
      this.page.waitForEvent('dialog'),
      this.addToCartBtn.click()
    ]);
    await dialog.accept();
    await this.page.waitForTimeout(500);
  }
}

module.exports = { ProductPage };
