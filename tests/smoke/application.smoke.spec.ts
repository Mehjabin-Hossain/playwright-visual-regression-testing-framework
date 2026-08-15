import { test, expect } from '../../fixtures/visual.fixture';

test.describe('application smoke coverage', () => {
  test('home page loads', async ({ visualDemoPage, page }) => {
    await visualDemoPage.openHomePage();
    await expect(page.getByRole('heading', { name: 'VisualSure' })).toBeVisible();
  });

  test('product page loads', async ({ visualDemoPage, page }) => {
    await visualDemoPage.openProductPage();
    await expect(page.getByRole('heading', { name: 'Astra UI Kit' })).toBeVisible();
  });

  test('dashboard page loads', async ({ visualDemoPage, page }) => {
    await visualDemoPage.openDashboardPage();
    await expect(page.getByRole('heading', { name: 'Quality Dashboard' })).toBeVisible();
  });

  test('main navigation works', async ({ visualDemoPage, page }) => {
    await visualDemoPage.openHomePage();
    await page
      .getByRole('navigation', { name: 'Primary navigation' })
      .getByRole('link', { name: 'Product' })
      .click();
    await expect(page).toHaveURL(/\/product\.html$/);
    await page
      .getByRole('navigation', { name: 'Primary navigation' })
      .getByRole('link', { name: 'Dashboard' })
      .click();
    await expect(page).toHaveURL(/\/dashboard\.html$/);
  });

  test('product can be added to cart', async ({ visualDemoPage }) => {
    await visualDemoPage.openProductPage();
    await visualDemoPage.addProductToCart();
    await expect(visualDemoPage.notificationArea).toBeVisible();
  });

  test('modal can open and close', async ({ visualDemoPage, page }) => {
    await visualDemoPage.openHomePage();
    await visualDemoPage.openModal();
    await visualDemoPage.closeModal();
    await expect(page.getByRole('dialog', { name: 'Release notes' })).toBeHidden();
  });
});
