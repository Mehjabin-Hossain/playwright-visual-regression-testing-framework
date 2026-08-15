import type {
  Locator,
  Page,
  PageAssertionsToHaveScreenshotOptions,
  TestInfo,
  ViewportSize,
} from '@playwright/test';
import { expect } from '@playwright/test';

import { visualConfig, type VisualCompareOptions } from '../config/visual.config';
import { toSafeSnapshotName } from './file-utils';
import { preparePageForVisualTest } from './visual-stability';

type LocatorScreenshotAssertionOptions = {
  readonly animations: 'allow' | 'disabled';
  readonly caret: 'hide' | 'initial';
  readonly mask?: Locator[];
  readonly maskColor?: string;
  readonly maxDiffPixels?: number;
  readonly maxDiffPixelRatio?: number;
  readonly omitBackground?: boolean;
  readonly scale: 'css' | 'device';
  readonly stylePath?: string | string[];
  readonly threshold?: number;
  readonly timeout?: number;
};

export class VisualComparator {
  public constructor(
    private readonly page: Page,
    private readonly testInfo: TestInfo,
  ) {}

  public async comparePage(
    snapshotName: string,
    options: VisualCompareOptions = {},
  ): Promise<void> {
    await this.prepare(options);
    await this.attachScreenshotDetails(snapshotName, options);
    await expect(this.page).toHaveScreenshot(toSafeSnapshotName(snapshotName), {
      ...this.buildPageScreenshotOptions(options),
      fullPage: options.fullPage ?? visualConfig.fullPage,
    });
  }

  public async compareComponent(
    locator: Locator,
    snapshotName: string,
    options: VisualCompareOptions = {},
  ): Promise<void> {
    await this.prepare(options);
    await expect(locator).toBeVisible();
    await this.attachScreenshotDetails(snapshotName, options);
    await expect(locator).toHaveScreenshot(
      toSafeSnapshotName(snapshotName),
      this.buildLocatorScreenshotOptions(options),
    );
  }

  public async compareResponsivePage(
    snapshotName: string,
    viewport: ViewportSize,
    options: VisualCompareOptions = {},
  ): Promise<void> {
    await this.page.setViewportSize(viewport);
    await this.comparePage(snapshotName, options);
  }

  public async compareCurrentState(
    snapshotName: string,
    options: VisualCompareOptions = {},
  ): Promise<void> {
    await this.comparePage(snapshotName, {
      ...options,
      fullPage: options.fullPage ?? false,
    });
  }

  public async attachScreenshotDetails(
    snapshotName = 'visual-comparison',
    options: VisualCompareOptions = {},
  ): Promise<void> {
    const viewport = this.page.viewportSize();
    const payload = {
      projectName: this.testInfo.project.name,
      snapshotName: toSafeSnapshotName(snapshotName),
      viewport,
      options: {
        fullPage: options.fullPage ?? visualConfig.fullPage,
        maxDiffPixels: options.maxDiffPixels ?? visualConfig.maxDiffPixels,
        maxDiffPixelRatio: options.maxDiffPixelRatio ?? visualConfig.maxDiffPixelRatio,
        threshold: options.threshold ?? visualConfig.threshold,
        animations: options.animations ?? visualConfig.animations,
        caret: options.caret ?? visualConfig.caret,
      },
    };

    await this.testInfo.attach('visual-comparison-settings', {
      body: JSON.stringify(payload, null, 2),
      contentType: 'application/json',
    });
  }

  private async prepare(options: VisualCompareOptions): Promise<void> {
    await preparePageForVisualTest(this.page, {
      freezeDynamicContent: options.freezeDynamicContent,
    });
  }

  private buildPageScreenshotOptions(
    options: VisualCompareOptions,
  ): PageAssertionsToHaveScreenshotOptions {
    return {
      animations: options.animations ?? visualConfig.animations,
      caret: options.caret ?? visualConfig.caret,
      clip: options.clip,
      mask: options.mask,
      maskColor: options.maskColor ?? visualConfig.maskColor,
      maxDiffPixels: options.maxDiffPixels ?? visualConfig.maxDiffPixels,
      maxDiffPixelRatio: options.maxDiffPixelRatio ?? visualConfig.maxDiffPixelRatio,
      omitBackground: options.omitBackground,
      scale: visualConfig.scale,
      stylePath: options.stylePath,
      threshold: options.threshold ?? visualConfig.threshold,
      timeout: options.timeout ?? visualConfig.timeout,
    };
  }

  private buildLocatorScreenshotOptions(
    options: VisualCompareOptions,
  ): LocatorScreenshotAssertionOptions {
    return {
      animations: options.animations ?? visualConfig.animations,
      caret: options.caret ?? visualConfig.caret,
      mask: options.mask,
      maskColor: options.maskColor ?? visualConfig.maskColor,
      maxDiffPixels: options.maxDiffPixels ?? visualConfig.maxDiffPixels,
      maxDiffPixelRatio: options.maxDiffPixelRatio ?? visualConfig.maxDiffPixelRatio,
      omitBackground: options.omitBackground,
      scale: visualConfig.scale,
      stylePath: options.stylePath,
      threshold: options.threshold ?? visualConfig.threshold,
      timeout: options.timeout ?? visualConfig.timeout,
    };
  }
}
