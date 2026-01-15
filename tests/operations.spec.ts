import { test, expect } from '@playwright/test';

import { OpenAccount } from '../pages/OpenAccount';




test.beforeEach(async ({ page }) => {
  await page.goto('http://parabank.parasoft.com/parabank/index.htm');
  // Login before each test
  await page.fill('input[name="username"]', 'maven');
  await page.fill('input[name="password"]', 'test123');
  await page.click('input[type="submit"]');
  // Debug: print page HTML after login attempt
  const html = await page.content();
  console.log('Page HTML after login:', html);
  // You can now inspect the HTML output to find a reliable selector for a successful login
})

test('Open New Account', async ({ page }) => {
  const openAccount = new OpenAccount(page);
  await openAccount.goTo();
  // Wait for the account type select to be visible
  await expect(page.locator('select#type')).toBeVisible({ timeout: 10000 });
  await openAccount.selectAccountType('1');
  // Wait for the fromAccountId select to have at least one option
  await page.waitForSelector('select#fromAccountId option', { timeout: 10000, state: 'attached' });
  const optionCount = await page.locator('select#fromAccountId option').count();
  expect(optionCount).toBeGreaterThan(0);
  // Select the first available account
  const fromAccountOptions = await page.locator('select#fromAccountId option').allTextContents();
  const fromAccountId = fromAccountOptions[0];
  await page.selectOption('select#fromAccountId', fromAccountId);
  // Wait for the submit button to be visible and click it
  await expect(page.locator('input[type="button"][value="Open New Account"]')).toBeVisible({ timeout: 10000 });
  await page.click('input[type="button"][value="Open New Account"]');
  // Wait for the new account id to appear
  await expect(page.locator('#newAccountId')).toBeVisible({ timeout: 10000 });
  const newAccountId = await page.locator('#newAccountId').innerText();
  console.log('New Account ID:', newAccountId);
  console.log('From Account ID:', fromAccountId);
  await expect(page.locator('#newAccountId')).toContainText(newAccountId);
});

test('Transfer Funds', async ({ page }) => {
  // Wait for the Transfer Funds link to be visible and click
  try {
    await expect(page.getByRole('link', { name: 'Transfer Funds' }).first()).toBeVisible({ timeout: 10000 });
    await page.getByRole('link', { name: 'Transfer Funds' }).first().click();
  } catch (error) {
    const html = await page.content();
    console.log('Transfer Funds test page HTML (link):', html);
    throw error;
  }
  // Wait for the amount input to be visible
  try {
    await expect(page.locator('#amount')).toBeVisible({ timeout: 10000 });
  } catch (error) {
    const html = await page.content();
    console.log('Transfer Funds test page HTML (amount):', html);
    throw error;
  }
  await page.locator('#amount').click();
  await page.locator('#amount').fill('100');
  // Wait for the toAccountId select to be visible and have options
  await page.waitForSelector('#toAccountId option', { timeout: 10000, state: 'attached' });
  const toAccountOptions = await page.locator('#toAccountId option').allTextContents();
  console.log('Available toAccountId options:', toAccountOptions);
  expect(toAccountOptions.length).toBeGreaterThan(0);
  const toAccountId = toAccountOptions[0];
  console.log('Transferring to Account ID:', toAccountId);
  await page.locator('#toAccountId').selectOption(toAccountId);
  await expect(page.getByRole('button', { name: 'Transfer' })).toBeVisible({ timeout: 10000 });
  await page.getByRole('button', { name: 'Transfer' }).click();
  // Wait for the result to be visible
  await expect(page.locator('#showResult')).toBeVisible({ timeout: 10000 });
  await expect(page.locator('#showResult')).toContainText('Transfer Complete!');
  // Optionally, check for the transferred amount and account IDs in the result
  // await expect(page.locator('#showResult')).toContainText(`$100.00 has been transferred`);
});