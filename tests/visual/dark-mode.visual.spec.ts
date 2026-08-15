import { test, expect } from '../../fixtures/visual.fixture';

test.describe('dark-mode visual regression', () => {
  test('home page has separate light and dark baselines', async ({
    visualDemoPage,
    visualComparator,
  }) => {
    await visualDemoPage.openHomePage();
    await visualComparator.comparePage('home-light-mode-full-page');

    await visualDemoPage.switchToDarkMode();
    await visualComparator.comparePage('home-dark-mode-full-page');
  });

  test('hero component has a separate dark-mode baseline', async ({
    visualDemoPage,
    visualComparator,
  }) => {
    await visualDemoPage.openHomePage();
    await visualDemoPage.switchToDarkMode();
    await expect(visualDemoPage.appShell).toHaveAttribute('data-theme', 'dark');
    await visualComparator.compareComponent(visualDemoPage.hero, 'home-hero-dark-mode-component');
  });
});
