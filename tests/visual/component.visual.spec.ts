import { test } from '../../fixtures/visual.fixture';
import { viewports } from '../../config/viewports';

test.describe('component visual regression', () => {
  test('header component matches the approved baseline', async ({
    visualDemoPage,
    visualComparator,
  }) => {
    await visualDemoPage.openHomePage();
    await visualComparator.compareComponent(visualDemoPage.header, 'home-header-component');
  });

  test('hero component matches the approved baseline', async ({
    visualDemoPage,
    visualComparator,
  }) => {
    await visualDemoPage.openHomePage();
    await visualComparator.compareComponent(visualDemoPage.hero, 'home-hero-component');
  });

  test('feature card component matches the approved baseline', async ({
    visualDemoPage,
    visualComparator,
  }) => {
    await visualDemoPage.openHomePage();
    await visualComparator.compareComponent(
      visualDemoPage.featureCard('component'),
      'home-feature-card-component',
    );
  });

  test('product card component matches the approved baseline', async ({
    visualDemoPage,
    visualComparator,
  }) => {
    await visualDemoPage.openProductPage();
    await visualComparator.compareComponent(visualDemoPage.productCard(), 'product-card-component');
  });

  test('dashboard statistic card matches the approved baseline', async ({
    visualDemoPage,
    visualComparator,
  }) => {
    await visualDemoPage.openDashboardPage();
    await visualComparator.compareComponent(
      visualDemoPage.dashboardStatCard,
      'dashboard-stat-card-component',
    );
  });

  test('navigation menu matches the approved baseline', async ({
    visualDemoPage,
    visualComparator,
    page,
  }) => {
    await page.setViewportSize(viewports.mobile);
    await visualDemoPage.openHomePage();
    await visualDemoPage.expandMobileNavigation();
    await visualComparator.compareComponent(
      visualDemoPage.mobileNavigationMenu(),
      'home-mobile-navigation-component',
    );
  });
});
