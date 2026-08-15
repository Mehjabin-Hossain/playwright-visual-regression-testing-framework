import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { defaultMaskedSelectors } from '../config/visual.config';

const stabilityStyles = `
*,
*::before,
*::after {
  animation-delay: 0s !important;
  animation-duration: 0s !important;
  animation-iteration-count: 1 !important;
  caret-color: transparent !important;
  scroll-behavior: auto !important;
  transition-delay: 0s !important;
  transition-duration: 0s !important;
}

[data-visual-hidden="true"] {
  visibility: hidden !important;
}
`;

export interface PreparePageOptions {
  readonly dynamicSelectors?: readonly string[];
  readonly freezeDynamicContent?: boolean;
  readonly waitForMain?: boolean;
}

export const waitForFonts = async (page: Page): Promise<void> => {
  await page.evaluate(async () => {
    if ('fonts' in document) {
      await document.fonts.ready;
    }
  });
};

export const disableAnimations = async (page: Page): Promise<void> => {
  await page.addStyleTag({ content: stabilityStyles });
};

export const waitForPageStability = async (page: Page): Promise<void> => {
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('body')).toBeVisible();

  const mainContent = page.locator('main').first();
  if ((await mainContent.count()) > 0) {
    await expect(mainContent).toBeVisible();
  }

  await waitForFonts(page);
};

export const hideDynamicElements = async (
  page: Page,
  selectors: readonly string[] = defaultMaskedSelectors,
): Promise<void> => {
  for (const selector of selectors) {
    const elements = page.locator(selector);
    if ((await elements.count()) > 0) {
      await elements.evaluateAll((nodes) => {
        for (const node of nodes) {
          node.setAttribute('data-visual-hidden', 'true');
        }
      });
    }
  }
};

export const freezeDynamicContent = async (page: Page): Promise<void> => {
  const dynamicElements = page.locator('[data-dynamic-content="true"]');

  if ((await dynamicElements.count()) === 0) {
    return;
  }

  await dynamicElements.evaluateAll((nodes) => {
    for (const node of nodes) {
      const fixedValue = node.getAttribute('data-visual-value') ?? 'Stable dynamic content';
      node.textContent = fixedValue;
    }
  });
};

export const preparePageForVisualTest = async (
  page: Page,
  options: PreparePageOptions = {},
): Promise<void> => {
  await waitForPageStability(page);
  await disableAnimations(page);

  if (options.freezeDynamicContent ?? true) {
    await freezeDynamicContent(page);
  }

  if (options.dynamicSelectors !== undefined) {
    await hideDynamicElements(page, options.dynamicSelectors);
  }

  if (options.waitForMain ?? true) {
    await expect(page.locator('[data-testid="app-shell"]')).toBeVisible();
  }

  await waitForFonts(page);
};
