import { defineConfig, devices } from '@playwright/test';

import { environment } from './config/environments';
import { viewports } from './config/viewports';
import { visualConfig } from './config/visual.config';

const visualTestMatch = /.*\.visual\.spec\.ts/;
const smokeTestMatch = /.*\.smoke\.spec\.ts/;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: environment.isCI,
  retries: environment.isCI ? 2 : 0,
  workers: environment.isCI ? 2 : undefined,
  timeout: 45_000,
  expect: {
    timeout: 10_000,
    toHaveScreenshot: {
      animations: visualConfig.animations,
      caret: visualConfig.caret,
      maxDiffPixels: visualConfig.maxDiffPixels,
      maxDiffPixelRatio: visualConfig.maxDiffPixelRatio,
      threshold: visualConfig.threshold,
    },
  },
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }], ['list']],
  snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{projectName}/{arg}{ext}',
  use: {
    baseURL: environment.baseURL,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    locale: environment.locale,
    timezoneId: environment.timezoneId,
    colorScheme: 'light',
    viewport: viewports.desktop,
  },
  webServer: {
    command:
      'node ./node_modules/http-server/bin/http-server test-site -a 127.0.0.1 -p 4173 -c-1 --silent',
    url: environment.baseURL,
    reuseExistingServer: !environment.isCI,
    timeout: 30_000,
  },
  projects: [
    {
      name: 'chromium-visual',
      testMatch: visualTestMatch,
      use: {
        browserName: 'chromium',
        viewport: viewports.desktop,
        deviceScaleFactor: 1,
        colorScheme: 'light',
      },
    },
    {
      name: 'chromium-mobile',
      testMatch: visualTestMatch,
      use: {
        ...devices['Pixel 5'],
        browserName: 'chromium',
        colorScheme: 'light',
      },
    },
    {
      name: 'chromium-smoke',
      testMatch: smokeTestMatch,
      use: {
        browserName: 'chromium',
        viewport: viewports.desktop,
      },
    },
    {
      name: 'firefox-smoke',
      testMatch: smokeTestMatch,
      use: {
        browserName: 'firefox',
        viewport: viewports.desktop,
      },
    },
    {
      name: 'webkit-smoke',
      testMatch: smokeTestMatch,
      use: {
        browserName: 'webkit',
        viewport: viewports.desktop,
      },
    },
  ],
});
