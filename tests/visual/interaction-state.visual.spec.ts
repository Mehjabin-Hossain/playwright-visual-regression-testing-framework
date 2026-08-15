import { test } from '../../fixtures/visual.fixture';
import { viewports } from '../../config/viewports';

test.describe('interaction-state visual regression', () => {
  test('modal open state matches the approved baseline', async ({
    visualDemoPage,
    visualComparator,
  }) => {
    await visualDemoPage.openHomePage();
    await visualDemoPage.openModal();
    await visualComparator.compareCurrentState('home-modal-open-state');
  });

  test('added-to-cart notification matches the approved baseline', async ({
    visualDemoPage,
    visualComparator,
  }) => {
    await visualDemoPage.openProductPage();
    await visualDemoPage.addProductToCart();
    await visualComparator.compareCurrentState('product-added-to-cart-state');
  });

  test('selected product information tab matches the approved baseline', async ({
    visualDemoPage,
    visualComparator,
  }) => {
    await visualDemoPage.openProductPage();
    await visualDemoPage.openProductInformationTab('Shipping');
    await visualComparator.compareCurrentState('product-shipping-tab-state');
  });

  test('expanded mobile navigation menu matches the approved baseline', async ({
    visualDemoPage,
    visualComparator,
    page,
  }) => {
    await page.setViewportSize(viewports.mobile);
    await visualDemoPage.openHomePage();
    await visualDemoPage.expandMobileNavigation();
    await visualComparator.compareCurrentState('home-expanded-mobile-navigation-state');
  });
});
