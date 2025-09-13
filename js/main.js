// Progressive enhancement & accessible mobile navigation
(function () {
  // Remove no-js marker for CSS fallbacks
  const root = document.documentElement;
  root.classList.remove('no-js');

  const menuBtn = document.querySelector('.menu__btn');
  const menu = document.querySelector('.menu__list');
  const firstLink = menu ? menu.querySelector('a, button, [tabindex]:not([tabindex="-1"])') : null;

  if (!menuBtn || !menu) return;

  function openMenu() {
    menu.classList.add('menu__list--active');
    menuBtn.setAttribute('aria-expanded', 'true');
    // Defer focusing to next tick to ensure visibility
    setTimeout(() => {
      if (firstLink) firstLink.focus({ preventScroll: true });
    }, 0);
  }

  function closeMenu() {
    menu.classList.remove('menu__list--active');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.focus({ preventScroll: true });
  }

  menuBtn.addEventListener('click', () => {
    const isOpen = menu.classList.contains('menu__list--active');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close on Escape when menu is open
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('menu__list--active')) {
      e.preventDefault();
      closeMenu();
    }
  });

  // Close when clicking a link inside the menu (typical SPA anchor nav)
  menu.addEventListener('click', (e) => {
    const target = e.target.closest('a');
    if (target) {
      closeMenu();
    }
  });
})();