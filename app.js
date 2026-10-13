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
  const groups = new Map(JSON.parse(document.querySelector('#menu-groups').textContent).map(group => [group.id, group]));
  const status = document.querySelector('.menu-status');
  const noResults = document.querySelector('.no-results');
  const subnav = document.querySelector('.menu-subnav');
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('de').replace(/ß/g, 'ss');
  const searchable = new Map(categories.flatMap(category => [...category.querySelectorAll('.menu-dish')].map(dish => [dish, normalize([...dish.children].filter(node => !node.classList.contains('dish-order')).map(node => node.textContent).join(' '))])));
  let selected = 'group-vorspeisen';
  let searchTimer;

  function filterMenu({announce = true} = {}) {
    const term = normalize(search.value.trim());
    const activeCategory = categories.find(category => category.dataset.category === selected);
    const activeGroupId = groups.has(selected) ? selected : activeCategory?.dataset.menuGroup;
    const activeGroup = groups.get(activeGroupId);
    let count = 0;
    categories.forEach(category => {
      let categoryCount = 0;
      category.querySelectorAll('.menu-dish').forEach(dish => {
        const visible = searchable.get(dish).includes(term);
        dish.hidden = !visible;
        if (visible) categoryCount++;
      });
      category.querySelectorAll('.dish-group').forEach(group => {
        let next = group.nextElementSibling;
        let visible = false;
        while (next && !next.classList.contains('dish-group')) {
          if (!next.hidden) visible = true;
          next = next.nextElementSibling;
        }
        group.hidden = !visible;
      });
      const matchesCategory = selected === 'all' || category.dataset.category === selected || category.dataset.menuType === selected || category.dataset.menuGroup === selected;
      category.hidden = !matchesCategory || categoryCount === 0;
      if (!category.hidden) count += categoryCount;
    });
    categorySelect.value = selected;
    categoryLinks.forEach(link => {
      const isOverview = link.classList.contains('category-overview');
      const active = isOverview ? link.dataset.category === activeGroupId : link.dataset.category === selected;
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
      if (link.classList.contains('subcategory-link')) link.hidden = link.dataset.parentGroup !== activeGroupId;
    });
    subnav.hidden = !activeGroup;
    document.querySelector('#active-menu-title').textContent = activeGroup?.name || (selected === 'speisen' ? 'Alle Speisen' : 'Die ganze Karte');
    document.querySelector('#active-menu-description').textContent = activeGroup?.description || 'Speisen und Getränke. Entdecken Sie Ihre Auswahl.';
    const groupIndex = [...groups.keys()].indexOf(activeGroupId) + 1;
    document.querySelector('#active-menu-index').textContent = groupIndex ? `${String(groupIndex).padStart(2, '0')} / UNSERE KARTE` : 'UNSERE KARTE';
    noResults.hidden = count > 0;
    searchClear.hidden = !search.value;
    if (announce) status.textContent = `${count} ${count === 1 ? 'Eintrag' : 'Einträge'} angezeigt.`;
  }
  function selectCategory(id, clearSearch = true) {
    clearTimeout(searchTimer);
    if (id === 'getraenke') id = 'group-getraenke';
    if (!['all', 'speisen'].includes(id) && !groups.has(id) && !categories.some(category => category.dataset.category === id)) return;
    selected = id;
    if (clearSearch) search.value = '';
    filterMenu();
  }
  const scrollToMenu = () => document.querySelector('#menu-content').scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start'});
  categoryLinks.forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    selectCategory(link.dataset.category);
    if (groups.has(selected)) history.replaceState(null, '', `#${selected}`);
    if (innerWidth < 768 && link.classList.contains('category-overview')) scrollToMenu();
  }));
  categorySelect.addEventListener('change', () => selectCategory(categorySelect.value));
  search.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { selected = 'all'; filterMenu(); }, 120);
  });
  searchClear.addEventListener('click', () => {
    clearTimeout(searchTimer);
    search.value = '';
    filterMenu();
    search.focus();
  });
  document.querySelectorAll('[data-show-category]').forEach(link => link.addEventListener('click', event => {
    selectCategory(link.dataset.showCategory);
    if (groups.has(selected)) {
      event.preventDefault();
      history.replaceState(null, '', `#${selected}`);
      scrollToMenu();
    }
  }));
  function revealHash() {
    const id = window.location.hash.slice(1);
    if (groups.has(id)) { selectCategory(id); requestAnimationFrame(scrollToMenu); }
    if (id.startsWith('menu-')) {
      const category = categories.find(item => item.id === id);
      if (category) selectCategory(category.dataset.category);
    }
    if (id === 'allergene') document.querySelector('#allergene').open = true;
  }
  window.addEventListener('hashchange', revealHash);
  document.querySelectorAll('a[href="#allergene"]').forEach(link => link.addEventListener('click', () => { document.querySelector('#allergene').open = true; }));
  document.querySelector('.menu-toolbar').hidden = false;
  document.querySelector('.menu-group-intro').hidden = false;
  document.body.classList.add('menu-enhanced');
  selectCategory(selected);
  revealHash();
})();
