import type { Locator, PageScreenshotOptions } from '@playwright/test';

const parseNumber = (value: string | undefined, fallback: number): number => {
  if (value === undefined || value.trim() === '') {
    return fallback;
  }

  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : fallback;
};

const parseBoolean = (value: string | undefined, fallback: boolean): boolean => {
  if (value === undefined || value.trim() === '') {
    return fallback;
  }

  return value.toLowerCase() === 'true';
};

export const defaultMaskedSelectors = [
  '[data-testid="dynamic-date"]',
  '[data-testid="dynamic-timestamp"]',
  '[data-testid="user-status"]',
] as const;

export type VisualMask = Locator;

export interface VisualCompareOptions {
  readonly fullPage?: boolean;
  readonly mask?: VisualMask[];
  readonly maskColor?: string;
  readonly animations?: 'allow' | 'disabled';
  readonly caret?: 'hide' | 'initial';
  readonly maxDiffPixels?: number;
  readonly maxDiffPixelRatio?: number;
  readonly threshold?: number;
  readonly clip?: PageScreenshotOptions['clip'];
  readonly omitBackground?: boolean;
  readonly stylePath?: string | string[];
  readonly timeout?: number;
  readonly freezeDynamicContent?: boolean;
}

export const visualConfig = {
  animations: 'disabled',
  caret: 'hide',
  scale: 'css',
  maxDiffPixels: parseNumber(process.env.VISUAL_MAX_DIFF_PIXELS, 80),
  maxDiffPixelRatio: parseNumber(process.env.VISUAL_MAX_DIFF_PIXEL_RATIO, 0.001),
  threshold: parseNumber(process.env.VISUAL_THRESHOLD, 0.2),
  timeout: parseNumber(process.env.VISUAL_SCREENSHOT_TIMEOUT, 10_000),
  fullPage: true,
  failOnDifference: parseBoolean(process.env.VISUAL_FAIL_ON_DIFFERENCE, true),
  maskColor: '#ff00cc',
  defaultMaskedSelectors,
} as const;
