import type { ViewportSize } from '@playwright/test';

export const viewports = {
  desktop: { width: 1440, height: 900 },
  laptop: { width: 1280, height: 720 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 390, height: 844 },
} as const satisfies Record<string, ViewportSize>;

export type ViewportName = keyof typeof viewports;
