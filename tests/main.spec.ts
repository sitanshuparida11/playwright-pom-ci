import { test, expect } from '@playwright/test';
import { RegisterAccount } from '../pages/RegisterAccount';
import { faker } from '@faker-js/faker'


test('Register  Account', async ({ page }) => {
  const password = faker.internet.password({ length: 8 });
  const registerAccount = new RegisterAccount(page);
  let username: string = '';
  let registrationSuccess = false;
  for (let attempt = 0; attempt < 5; attempt++) {
    username = 'user_' + Date.now() + '_' + Math.floor(Math.random() * 1000000);
    await registerAccount.goTo();
    await registerAccount.fillForm();
    await registerAccount.fillFormWithCredentials(username, password);
    await page.getByRole('button', { name: 'Register' }).click();
    // Wait for either error or success message to appear
    const errorLocator = page.locator('#customer\\.username\\.errors');
    const successLocator = page.locator('#rightPanel');
    await Promise.race([
      errorLocator.waitFor({ state: 'visible', timeout: 5000 }),
      successLocator.waitFor({ state: 'visible', timeout: 5000 })
    ]);
    // Check for success message
    const rightPanelText = await successLocator.textContent();
    if (rightPanelText && rightPanelText.includes('Your account was created successfully')) {
      registrationSuccess = true;
      break;
    }
    // Check for error message
    const errorText = await errorLocator.textContent();
    if (!errorText || !errorText.includes('already exists')) {
      // No error, treat as success
      registrationSuccess = true;
      break;
    }
    // If duplicate, try a new username
    // Loop will continue
  }
  expect(registrationSuccess).toBe(true);
  // Check for generic success message
  await expect(page.locator('#rightPanel')).toContainText('Your account was created successfully');

  // Optionally, log out and log in with the new user to verify
  await page.getByRole('link', { name: 'Log Out' }).click();
  await page.fill('input[name="username"]', username);
  await page.fill('input[name="password"]', password);
  await page.click('input[type="submit"]');
  await page.waitForLoadState('networkidle');
  // Check for dashboard or welcome message
  await expect(page.locator('ul').filter({ hasText: 'Account Services' })).toBeVisible();
});

 

// ...existing code...