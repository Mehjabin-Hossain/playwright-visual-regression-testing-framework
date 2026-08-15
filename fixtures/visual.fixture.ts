import { test as base, expect, type Page } from '@playwright/test';

import { VisualDemoPage } from '../pages/VisualDemoPage';
import { VisualComparator } from '../utils/VisualComparator';
import { preparePageForVisualTest } from '../utils/visual-stability';

interface VisualFixtures {
  readonly visualComparator: VisualComparator;
  readonly visualDemoPage: VisualDemoPage;
  readonly preparedPage: Page;
}

export const test = base.extend<VisualFixtures>({
  visualComparator: async ({ page }, use, testInfo) => {
    await use(new VisualComparator(page, testInfo));
  },
  visualDemoPage: async ({ page }, use) => {
    await use(new VisualDemoPage(page));
  },
  preparedPage: async ({ page }, use) => {
    await preparePageForVisualTest(page, { waitForMain: false });
    await use(page);
  },
});

export { expect };
