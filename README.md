# Playwright E2E Test

## Overview
This repository contains end-to-end (E2E) tests using [Playwright](https://playwright.dev/), an automation framework for web and api testing. The tests are designed to ensure the reliability and functionality of web applications by simulating real user interactions.

## Features
- Cross-browser testing (Chromium, Firefox, WebKit)
- Headless and headed mode execution
- Parallel test execution
- Integration with CI/CD pipelines
- Screenshots and video recording for debugging

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16 or later recommended)
- [Playwright](https://playwright.dev/) (install using instructions below)

## Installation
Clone the repository and install dependencies:
```sh
git clone https://github.com/maniziva/playwright-e2e-test.git
cd playwright-e2e-test
npm install
npx playwright install
```

## Running Tests
Run all tests in headless mode:
```sh
npx playwright test
```
Run tests in headed mode:
```sh
npx playwright test --headed
```
Run a specific test file:
```sh
npx playwright test tests/example.spec.js
```

## Test Reports
Generate and view an HTML report:
```sh
npx playwright test --reporter=html
npx playwright show-report
```

## Test Structure
The repository is organized as follows:
- **API Test Scripts**: Located in the `api-test` folder
- **Web Test Scripts**: Located in the `web-test` folder

## Configuration
Playwright test configurations are split into separate files:
- **API Test Configuration**: `playwright.api.config.ts`
- **Web Test Configuration**: `playwright.web.config.ts`
- **Global Setup for Web Tests**: `web-global-setup.ts`

Modify these files to customize test execution settings:
- **Browsers**: Define which browsers to test
- **Base URL**: Set the application URL
- **Timeouts**: Configure test timeouts
- **Retries**: Enable retries for flaky tests

## CI/CD Integration
Playwright tests can be integrated into CI/CD pipelines using GitHub Actions, Jenkins, or other CI tools. Example GitHub Actions workflow:
```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      - name: Install dependencies
        run: npm install
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run tests
        run: npx playwright test
```

## Debugging
- Use `--debug` mode to inspect issues:
  ```sh
  npx playwright test --debug
  ```
- Capture screenshots and videos for failed tests by updating `playwright.config.js`.

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-branch`)
3. Commit changes (`git commit -m "Add new feature"`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a Pull Request

## Contributors
- [Manikandan](https://github.com/maniziva) - Maintainer & Lead Developer (API & Web Automation)
