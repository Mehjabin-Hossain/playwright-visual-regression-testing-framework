import { test, expect } from '../../fixtures/visual.fixture';

test.describe('masked dynamic content visual regression', () => {
  test('dashboard masks only volatile status regions', async ({
    visualDemoPage,
    visualComparator,
    page,
  }) => {
    await visualDemoPage.openDashboardPage();
    await expect(visualDemoPage.dynamicTimestamp).toContainText('Last synced:');

    await visualComparator.comparePage('dashboard-masked-dynamic-content', {
      freezeDynamicContent: false,
      mask: [visualDemoPage.dynamicTimestamp, page.getByTestId('user-status')],
    });
  });
});
