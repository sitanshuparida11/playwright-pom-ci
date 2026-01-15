class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.table = page.locator('table.table');
  }

  async hasItem(itemName) {
    return (await this.page.locator('table.table td').filter({ hasText: itemName }).count()) > 0;
  }

  async deleteItem(itemName) {
    // Find the delete link for the row that contains the item name
    const deleteLocator = this.page.locator(`xpath=//td[text()="${itemName}"]/..//a[text()="Delete"]`);
    await deleteLocator.click();
    // wait for the deletion to complete
    await this.page.waitForTimeout(1000);
  }
}

module.exports = { CartPage };
