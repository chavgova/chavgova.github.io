import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:4321', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'tablet', use: { viewport: { width: 768, height: 1024 } } },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium', viewport: { width: 375, height: 812 } } },
  ],
  webServer: { command: 'npm run preview -- --host 127.0.0.1', url: 'http://127.0.0.1:4321', reuseExistingServer: !process.env.CI },
});
