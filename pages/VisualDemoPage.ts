import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class VisualDemoPage {
  public readonly appShell: Locator;
  public readonly header: Locator;
  public readonly hero: Locator;
  public readonly navMenu: Locator;
  public readonly dashboardStatCard: Locator;
  public readonly notificationArea: Locator;
  public readonly dynamicTimestamp: Locator;

  public constructor(private readonly page: Page) {
    this.appShell = page.getByTestId('app-shell');
    this.header = page.getByRole('banner');
    this.hero = page.getByTestId('hero');
    this.navMenu = page.getByRole('navigation', { name: 'Primary navigation' });
    this.dashboardStatCard = page.getByTestId('stat-card-revenue');
    this.notificationArea = page.getByTestId('notification-area');
    this.dynamicTimestamp = page.getByTestId('dynamic-timestamp');
  }

  public async openHomePage(): Promise<void> {
    await this.page.goto('/');
    await expect(this.appShell).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'VisualSure' })).toBeVisible();
  }

  public async openProductPage(): Promise<void> {
    await this.page.goto('/product.html');
    await expect(this.appShell).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Astra UI Kit' })).toBeVisible();
  }

  public async openDashboardPage(): Promise<void> {
    await this.page.goto('/dashboard.html');
    await this.waitForDashboardReady();
  }

  public async openModal(): Promise<void> {
    await this.page.getByRole('button', { name: 'Open release notes' }).click();
    await expect(this.page.getByRole('dialog', { name: 'Release notes' })).toBeVisible();
  }

  public async closeModal(): Promise<void> {
    await this.page.getByRole('button', { name: 'Close release notes' }).click();
    await expect(this.page.getByRole('dialog', { name: 'Release notes' })).toBeHidden();
  }

  public async switchToDarkMode(): Promise<void> {
    await this.page.getByRole('switch', { name: 'Use dark theme' }).click();
    await expect(this.appShell).toHaveAttribute('data-theme', 'dark');
  }

  public async addProductToCart(): Promise<void> {
    await this.page.getByRole('button', { name: 'Add Astra UI Kit to cart' }).click();
    await expect(this.notificationArea).toContainText('Astra UI Kit added to cart');
  }

  public async openProductInformationTab(
    tabName: 'Details' | 'Shipping' | 'Support',
  ): Promise<void> {
    await this.page.getByRole('tab', { name: tabName }).click();
    await expect(this.page.getByRole('tab', { name: tabName })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  }

  public async waitForDashboardReady(): Promise<void> {
    await expect(this.appShell).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Quality Dashboard' })).toBeVisible();
    await expect(this.page.getByTestId('dashboard-table')).toBeVisible();
  }

  public featureCard(cardName: string): Locator {
    return this.page.getByTestId(`feature-card-${cardName}`);
  }

  public productCard(): Locator {
    return this.page.getByTestId('product-card');
  }

  public mobileNavigationMenu(): Locator {
    return this.page.getByTestId('mobile-navigation-panel');
  }

  public async expandMobileNavigation(): Promise<void> {
    await this.page.getByRole('button', { name: 'Open navigation menu' }).click();
    await expect(this.mobileNavigationMenu()).toBeVisible();
  }
}
