import { test } from '../../fixtures/visual.fixture';
import { responsiveScenarios } from '../../test-data/visual-test-data';

test.describe('responsive visual regression', () => {
  for (const scenario of responsiveScenarios) {
    test(`home page matches the ${scenario.name} responsive baseline`, async ({
      visualDemoPage,
      visualComparator,
    }) => {
      await visualDemoPage.openHomePage();
      await visualComparator.compareResponsivePage(
        `home-responsive-${scenario.name}`,
        scenario.viewport,
      );
    });

    test(`product page matches the ${scenario.name} responsive baseline`, async ({
      visualDemoPage,
      visualComparator,
    }) => {
      await visualDemoPage.openProductPage();
      await visualComparator.compareResponsivePage(
        `product-responsive-${scenario.name}`,
        scenario.viewport,
      );
    });
  }
});
