# POM Playwright (JavaScript)

This repository is scaffolded for a Page Object Model (POM) using Playwright Test (JavaScript).

## Quick start

1. Install dependencies:

   npm install

2. Install Playwright browsers:

   npx playwright install

3. Run tests:

   npm test

4. View report (after running tests):

   npm run test:report

## Structure

- `src/pages/` — Page Object classes
- `tests/` — Playwright tests
- `playwright.config.js` — Playwright Test config

## Demo: demoblaze scenarios

A sample test `tests/example.spec.js` now demonstrates the following end-to-end flow against `https://www.demoblaze.com`:
- Sign up with a timestamped username
- Log in as that user
- Select a product and add it to the cart
- Navigate to Cart and delete the item

> The test creates a new user (unique username) so it is safe to run multiple times.

## CI

A GitHub Actions workflow is included to run tests on push and PRs.

---

Update or add more Page Objects & tests as needed.
