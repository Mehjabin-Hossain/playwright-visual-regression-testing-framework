import { test } from '../../fixtures/visual.fixture';

test.describe('full-page visual regression', () => {
  test('home page matches the approved full-page baseline', async ({
    visualDemoPage,
    visualComparator,
  }) => {
    await visualDemoPage.openHomePage();
    await visualComparator.comparePage('home-full-page');
  });

  test('product page matches the approved full-page baseline', async ({
    visualDemoPage,
    visualComparator,
  }) => {
    await visualDemoPage.openProductPage();
    await visualComparator.comparePage('product-full-page');
  });

  test('dashboard page matches the approved full-page baseline', async ({
    visualDemoPage,
    visualComparator,
  }) => {
    await visualDemoPage.openDashboardPage();
    await visualComparator.comparePage('dashboard-full-page');
  });
});
