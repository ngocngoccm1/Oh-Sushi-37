(() => {
  'use strict';
  document.documentElement.classList.remove('no-js');
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const main = document.querySelector('main');
  const footer = document.querySelector('.site-footer');
  const desktopQuery = window.matchMedia('(min-width: 768px)');
  let navOpen = false;

  function setNav(open, restoreFocus = false) {
    navOpen = open;
    mobileNav.hidden = !open;
    mobileNav.inert = !open;
    main.inert = open;
    footer.inert = open;
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Navigation schließen' : 'Navigation öffnen');
    if (open) mobileNav.querySelector('a').focus();
    else if (restoreFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => setNav(!navOpen));
  document.addEventListener('before-order-open', () => { if (navOpen) setNav(false); });
  mobileNav.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;
    setNav(false);
    if (link.hash) {
      const destination = document.querySelector(link.hash);
      if (destination) {
        destination.setAttribute('tabindex', '-1');
        destination.focus({preventScroll: true});
      }
    }
  });
  document.addEventListener('keydown', (event) => {
    if (!navOpen) return;
    if (event.key === 'Escape') { setNav(false, true); return; }
    if (event.key !== 'Tab') return;
    const elements = [toggle, ...mobileNav.querySelectorAll('a')];
    const first = elements[0];
    const last = elements[elements.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  desktopQuery.addEventListener('change', (event) => { if (event.matches && navOpen) setNav(false); });
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 80);
  window.addEventListener('scroll', updateHeader, {passive: true});
  updateHeader();

  const categorySelect = document.querySelector('#menu-category');
  const search = document.querySelector('#dish-search');
  const searchClear = document.querySelector('.search-clear');
  const categoryLinks = [...document.querySelectorAll('.category-link')];
  const categories = [...document.querySelectorAll('.menu-category')];
  const status = document.querySelector('.menu-status');
  const noResults = document.querySelector('.no-results');
  const menuNav = document.querySelector('.menu-nav');
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('de').replace(/ß/g, 'ss');
  const searchable = new Map(categories.flatMap(category => [...category.querySelectorAll('.menu-dish')].map(dish => [dish, normalize([...dish.children].filter(node => !node.classList.contains('dish-order')).map(node => node.textContent).join(' '))])));
  let selected = 'fusion';
  let searchTimer;

  function filterMenu({announce = true} = {}) {
    const term = normalize(search.value.trim());
    let count = 0;
    categories.forEach(category => {
      let categoryCount = 0;
      category.querySelectorAll('.menu-dish').forEach(dish => {
        const visible = searchable.get(dish).includes(term);
        dish.hidden = !visible;
        if (visible) categoryCount++;
      });
      category.querySelectorAll('.dish-group').forEach(group => {
        let next=group.nextElementSibling;
        let visible=false;
        while (next && !next.classList.contains('dish-group')) {
          if (!next.hidden) visible=true;
          next=next.nextElementSibling;
        }
        group.hidden=!visible;
      });
      const matchesCategory = selected === 'all' || category.dataset.category === selected || category.dataset.menuType === selected;
      category.hidden = !matchesCategory || categoryCount === 0;
      if (!category.hidden) count += categoryCount;
    });
    categorySelect.value = selected;
    categoryLinks.forEach(link => {
      if (link.dataset.category === selected) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    noResults.hidden = count > 0;
    searchClear.hidden = !search.value;
    if (announce) status.textContent = `${count} ${count === 1 ? 'Eintrag' : 'Einträge'} angezeigt.`;
  }
  function selectCategory(id, clearSearch = true) {
    clearTimeout(searchTimer);
    if (!categoryLinks.some(link => link.dataset.category === id)) return;
    selected = id;
    if (clearSearch) search.value = '';
    filterMenu();
    const active = categoryLinks.find(link => link.dataset.category === id);
    if (active) {
      const firstVisible = categoryLinks[Math.max(0, categoryLinks.indexOf(active) - 4)];
      menuNav.scrollTop = Math.max(0, firstVisible.offsetTop - categoryLinks[0].offsetTop);
    }
  }
  categoryLinks.forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    selectCategory(link.dataset.category);
  }));
  categorySelect.addEventListener('change', () => selectCategory(categorySelect.value));
  search.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      selected = 'all';
      filterMenu();
    }, 120);
  });
  searchClear.addEventListener('click', () => {
    clearTimeout(searchTimer);
    search.value = '';
    filterMenu();
    search.focus();
  });
  document.querySelectorAll('[data-show-category]').forEach(link => link.addEventListener('click', () => selectCategory(link.dataset.showCategory)));
  function revealHash() {
    const id = window.location.hash.slice(1);
    if (id.startsWith('menu-')) {
      const category = categories.find(item => item.id === id);
      if (category) selectCategory(category.dataset.category);
    }
    if (id === 'allergene') document.querySelector('#allergene').open = true;
  }
  window.addEventListener('hashchange', revealHash);
  document.querySelectorAll('a[href="#allergene"]').forEach(link => link.addEventListener('click', () => { document.querySelector('#allergene').open = true; }));
  document.querySelector('.menu-toolbar').hidden = false;
  document.body.classList.add('menu-enhanced');
  selectCategory(selected);
  revealHash();
})();
