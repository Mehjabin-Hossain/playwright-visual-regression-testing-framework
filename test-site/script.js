const appShell = document.querySelector('[data-testid="app-shell"]');
const themeSwitch = document.querySelector('[data-testid="theme-switch"]');
const mobileToggle = document.querySelector('[data-testid="mobile-menu-toggle"]');
const mobilePanel = document.querySelector('[data-testid="mobile-navigation-panel"]');
const modalBackdrop = document.querySelector('[data-testid="release-modal-backdrop"]');
const openModalButton = document.querySelector('[data-testid="open-release-modal"]');
const closeModalButton = document.querySelector('[data-testid="close-release-modal"]');
const addToCartButton = document.querySelector('[data-testid="add-to-cart"]');
const notificationArea = document.querySelector('[data-testid="notification-area"]');
const dynamicTimestamp = document.querySelector('[data-testid="dynamic-timestamp"]');
const quantityInput = document.querySelector('[data-testid="quantity-input"]');

const setTheme = (theme) => {
  if (!appShell || !themeSwitch) {
    return;
  }

  const isDark = theme === 'dark';
  appShell.setAttribute('data-theme', theme);
  themeSwitch.setAttribute('aria-checked', String(isDark));
  themeSwitch.textContent = isDark ? 'Dark on' : 'Light on';
};

const openMobileNavigation = () => {
  if (!mobilePanel || !mobileToggle) {
    return;
  }

  mobilePanel.setAttribute('aria-hidden', 'false');
  mobileToggle.setAttribute('aria-expanded', 'true');
};

const openModal = () => {
  if (!modalBackdrop) {
    return;
  }

  modalBackdrop.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
};

const closeModal = () => {
  if (!modalBackdrop) {
    return;
  }

  modalBackdrop.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
};

const showNotification = (message) => {
  if (!notificationArea) {
    return;
  }

  notificationArea.hidden = false;
  notificationArea.textContent = message;
};

const activateTab = (selectedTab) => {
  const tabName = selectedTab.getAttribute('aria-controls');

  for (const tab of document.querySelectorAll('[role="tab"]')) {
    tab.setAttribute('aria-selected', String(tab === selectedTab));
  }

  for (const panel of document.querySelectorAll('[role="tabpanel"]')) {
    panel.hidden = panel.id !== tabName;
  }
};

if (themeSwitch) {
  themeSwitch.addEventListener('click', () => {
    const nextTheme = appShell?.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  });
}

if (mobileToggle) {
  mobileToggle.addEventListener('click', openMobileNavigation);
}

if (openModalButton) {
  openModalButton.addEventListener('click', openModal);
}

if (closeModalButton) {
  closeModalButton.addEventListener('click', closeModal);
}

if (modalBackdrop) {
  modalBackdrop.addEventListener('click', (event) => {
    if (event.target === modalBackdrop) {
      closeModal();
    }
  });
}

if (addToCartButton) {
  addToCartButton.addEventListener('click', () => {
    const quantity = quantityInput?.value ?? '1';
    showNotification(`Astra UI Kit added to cart. Quantity: ${quantity}.`);
  });
}

for (const tab of document.querySelectorAll('[role="tab"]')) {
  tab.addEventListener('click', () => activateTab(tab));
}

if (dynamicTimestamp) {
  dynamicTimestamp.textContent = `Last synced: ${new Date().toISOString()}`;
}

setTheme('light');
