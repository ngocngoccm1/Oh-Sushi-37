(() => {
  'use strict';
  const catalog = new Map(JSON.parse(document.querySelector('#order-catalog').textContent).map(item => [item.key, item]));
  const money = cents => new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(cents / 100);
  const storageKey = 'oh-sushi-37-cart-v1';
  const recipient = 'ohsushirestaurent@gmail.com';
  const cartDialog = document.querySelector('#cart-dialog');
  const dishDialog = document.querySelector('#dish-dialog');
  const cartItems = document.querySelector('#cart-items');
  const variantSelect = document.querySelector('#dish-variant');
  const optionSelect = document.querySelector('#dish-option');
  const quantityInput = document.querySelector('#dish-quantity');
  const confirmButton = document.querySelector('#dish-confirm');
  const toast = document.querySelector('.order-toast');
  const feedback = document.querySelector('#order-feedback');
  const orderForm = document.querySelector('#order-form');
  let cart = [];
  let currentDish;
  let toastTimer;
  let opener;

  function validLine(line) {
    if (!line || typeof line !== 'object') return false;
    const item = catalog.get(line.key);
    if (!item || !Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > 99) return false;
    if (item.variants.length && (!Number.isInteger(line.variantIndex) || !item.variants[line.variantIndex])) return false;
    if (!item.variants.length && line.variantIndex !== null) return false;
    return item.options.length ? item.options.includes(line.option) : line.option === '';
  }
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (Array.isArray(saved)) cart = saved.filter(validLine).slice(0, 200);
  } catch { /* Browsers with disabled storage still support a cart for this visit. */ }
  const unitPrice = line => {
    const item = catalog.get(line.key);
    return item.variants.length ? item.variants[line.variantIndex].price : item.price;
  };
  const count = () => cart.reduce((sum, line) => sum + line.quantity, 0);
  const total = () => cart.reduce((sum, line) => sum + unitPrice(line) * line.quantity, 0);
  function save() {
    try { localStorage.setItem(storageKey, JSON.stringify(cart)); } catch { /* Persistence is optional. */ }
  }
  function announce(text) {
    clearTimeout(toastTimer);
    toast.textContent = text;
    toast.classList.add('is-visible');
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2800);
  }
  function openDialog(dialog, button) {
    document.dispatchEvent(new Event('before-order-open'));
    opener = button || document.activeElement;
    dialog.showModal();
    document.body.classList.add('order-open');
  }
  function closeDialog(dialog) { dialog.close(); }
  [dishDialog, cartDialog].forEach(dialog => {
    dialog.querySelector('[data-close-dialog]').addEventListener('click', () => closeDialog(dialog));
    dialog.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      const controls = [...dialog.querySelectorAll('button, a[href], input, select, textarea')].filter(control => !control.disabled && control.getClientRects().length);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('order-open');
      if (opener?.isConnected) opener.focus({preventScroll: true});
    });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog(dialog);
    });
  });
  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function renderCart(focusTarget) {
    const fragment = document.createDocumentFragment();
    cart.forEach((line, index) => {
      const item = catalog.get(line.key);
      const row = element('li', 'cart-item');
      const heading = element('div', 'cart-item-heading');
      heading.append(element('h3', '', item.name), element('strong', '', money(unitPrice(line) * line.quantity)));
      row.append(heading);
      const variant = item.variants[line.variantIndex];
      if (variant || line.option || item.volume) row.append(element('p', 'cart-item-option', [item.volume, variant?.name, line.option].filter(Boolean).join(' · ')));
      if (item.marks) row.append(element('p', 'dish-marks', `${item.marksLabel}: ${item.marks}`));
      const bottom = element('div', 'cart-item-bottom');
      const stepper = element('div', 'quantity-stepper');
      const minus = element('button', '', '−');
      minus.type = 'button'; minus.dataset.cartAction = 'decrease'; minus.dataset.index = index;
      minus.setAttribute('aria-label', `${item.name}: Anzahl verringern`);
      minus.disabled = line.quantity <= 1;
      const quantity = element('span', '', String(line.quantity));
      quantity.setAttribute('aria-label', `Anzahl: ${line.quantity}`);
      const plus = element('button', '', '+');
      plus.type = 'button'; plus.dataset.cartAction = 'increase'; plus.dataset.index = index;
      plus.setAttribute('aria-label', `${item.name}: Anzahl erhöhen`);
      plus.disabled = line.quantity >= 99;
      stepper.append(minus, quantity, plus);
      const remove = element('button', 'cart-remove', 'Entfernen');
      remove.type = 'button'; remove.dataset.cartAction = 'remove'; remove.dataset.index = index;
      remove.setAttribute('aria-label', `${item.name} aus der Bestellung entfernen`);
      bottom.append(stepper, element('span', 'cart-unit-price', `${money(unitPrice(line))} / ${item.menuType === 'getraenke' ? 'Getränk' : 'Portion'}`), remove);
      row.append(bottom);
      fragment.append(row);
    });
    cartItems.replaceChildren(fragment);
    document.querySelector('#cart-empty').hidden = cart.length > 0;
    document.querySelector('#cart-filled').hidden = cart.length === 0;
    document.querySelectorAll('[data-cart-count]').forEach(node => { node.textContent = count(); });
    document.querySelectorAll('[data-cart-total]').forEach(node => { node.textContent = money(total()); });
    document.querySelectorAll('[data-open-cart]').forEach(button => button.setAttribute('aria-label', `Warenkorb öffnen, ${count()} Artikel, ${money(total())}`));
    document.querySelector('.cart-launcher').hidden = cart.length === 0;
    feedback.textContent = '';
    document.querySelector('#manual-copy-field').hidden = true;
    if (focusTarget) {
      const button = cartItems.querySelector(`[data-cart-action="${focusTarget.action}"][data-index="${focusTarget.index}"]`);
      const fallback = cartItems.querySelector('[data-cart-action="increase"]') || document.querySelector('#browse-dishes');
      (button && !button.disabled ? button : fallback)?.focus({preventScroll: true});
    }
  }
  cartItems.addEventListener('click', event => {
    const button = event.target.closest('[data-cart-action]');
    if (!button) return;
    const index = Number(button.dataset.index);
    const line = cart[index];
    if (!line) return;
    if (button.dataset.cartAction === 'remove') cart.splice(index, 1);
    if (button.dataset.cartAction === 'increase' && line.quantity < 99) line.quantity++;
    if (button.dataset.cartAction === 'decrease' && line.quantity > 1) line.quantity--;
    save(); renderCart({index, action: button.dataset.cartAction});
  });
  function addToCart(line) {
    if (!validLine(line)) return;
    const existing = cart.find(item => item.key === line.key && item.variantIndex === line.variantIndex && item.option === line.option);
    if (existing && existing.quantity + line.quantity > 99) {
      announce('Maximal 99 Portionen je Auswahl. Bitte passen Sie die Anzahl im Warenkorb an.');
      return;
    }
    if (existing) existing.quantity += line.quantity;
    else cart.push(line);
    save(); renderCart();
    announce(`${catalog.get(line.key).name} zur Bestellung hinzugefügt.`);
  }
  function fillOptions(select, options, placeholder) {
    select.replaceChildren(new Option(placeholder, ''));
    select.options[0].disabled = true;
    options.forEach(option => select.add(new Option(option.label, option.value)));
    select.value = '';
  }
  function updateConfiguredPrice() {
    if (!currentDish) return;
    const selectedVariant = variantSelect.value === '' ? null : currentDish.variants[Number(variantSelect.value)];
    const price = currentDish.variants.length ? selectedVariant?.price : currentDish.price;
    const quantity = Number(quantityInput.value);
    confirmButton.disabled = (currentDish.variants.length > 0 && !selectedVariant) || (currentDish.options.length > 0 && !optionSelect.value) || !Number.isInteger(quantity) || quantity < 1 || quantity > 99;
    document.querySelector('#configured-price').textContent = price === undefined || price === null ? 'Bitte Auswahl treffen' : money(price * (quantity || 1));
  }
  document.querySelectorAll('[data-add-dish]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => {
      const item = catalog.get(button.dataset.addDish);
      if (!item) return;
      if (!item.variants.length && !item.options.length) { addToCart({key: item.key, variantIndex: null, option: '', quantity: 1}); return; }
      currentDish = item;
      document.querySelector('#dish-dialog-title').textContent = item.name;
      document.querySelector('#dish-dialog-description').textContent = item.description;
      document.querySelector('#dish-dialog-marks').textContent = item.marks ? `${item.marksLabel}: ${item.marks}` : '';
      document.querySelector('label[for="dish-variant"]').textContent = item.variantLabel;
      document.querySelector('#dish-variant-field').hidden = !item.variants.length;
      document.querySelector('#dish-option-field').hidden = !item.options.length;
      variantSelect.required = item.variants.length > 0;
      optionSelect.required = item.options.length > 0;
      fillOptions(variantSelect, item.variants.map((variant, index) => ({label: `${variant.name} — ${money(variant.price)}`, value: String(index)})), 'Bitte Variante wählen');
      fillOptions(optionSelect, item.options.map(option => ({label: option, value: option})), 'Bitte auswählen');
      document.querySelector('label[for="dish-option"]').textContent = item.optionLabel;
      quantityInput.value = '1';
      updateConfiguredPrice();
      openDialog(dishDialog, button);
    });
  });
  variantSelect.addEventListener('change', updateConfiguredPrice);
  optionSelect.addEventListener('change', updateConfiguredPrice);
  quantityInput.addEventListener('input', updateConfiguredPrice);
  document.querySelector('#dish-config-form').addEventListener('submit', event => {
    event.preventDefault();
    if (confirmButton.disabled || !currentDish) return;
    const line = {key: currentDish.key, variantIndex: currentDish.variants.length ? Number(variantSelect.value) : null, option: currentDish.options.length ? optionSelect.value : '', quantity: Number(quantityInput.value)};
    if (!validLine(line)) return;
    addToCart(line); closeDialog(dishDialog);
  });
  document.querySelectorAll('[data-open-cart]').forEach(button => {
    if (!button.classList.contains('cart-launcher')) button.hidden = false;
    button.addEventListener('click', () => { renderCart(); openDialog(cartDialog, button); });
  });
  document.querySelector('#browse-dishes').addEventListener('click', () => {
    closeDialog(cartDialog);
    document.querySelector('#speisekarte').scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  });
  function orderText() {
    const lines = ['Bestellanfrage — Oh! Sushi 37', '', ...cart.map(line => {
      const item = catalog.get(line.key);
      const variant = item.variants[line.variantIndex];
      const options = [item.volume, variant?.name, line.option].filter(Boolean);
      return `${line.quantity} × ${variant?.code || item.code} ${item.name}${options.length ? ' (' + options.join(' · ') + ')' : ''} — ${money(unitPrice(line) * line.quantity)}`;
    }), '', `Summe der Bestellung: ${money(total())}`];
    const name = document.querySelector('#customer-name').value.trim();
    const phone = document.querySelector('#customer-phone').value.trim();
    const notes = document.querySelector('#order-notes').value.trim();
    if (name) lines.push('', `Name: ${name}`);
    if (phone) lines.push(`Telefon: ${phone}`);
    if (notes) lines.push('', `Anmerkungen: ${notes}`);
    lines.push('', 'Bitte bestätigen Sie Verfügbarkeit, Übergabe und den Gesamtbetrag. Vielen Dank!');
    return lines.join('\n');
  }
  orderForm.addEventListener('submit', event => {
    event.preventDefault();
    ['#customer-name', '#customer-phone'].forEach(selector => {
      const field = document.querySelector(selector);
      field.value = field.value.trim();
    });
    if (!cart.length || !orderForm.reportValidity()) return;
    const link = document.createElement('a');
    link.href = `mailto:${recipient}?subject=${encodeURIComponent('Bestellanfrage — Oh! Sushi 37')}&body=${encodeURIComponent(orderText())}`;
    link.click();
    feedback.textContent = 'Bitte senden Sie den Entwurf in Ihrem E-Mail-Programm. Falls sich kein Programm öffnet, kopieren Sie Ihre Bestellung oder rufen Sie uns an. Ihre Auswahl bleibt im Warenkorb.';
  });
  document.querySelector('#copy-order').addEventListener('click', async () => {
    const text = orderText();
    try {
      await navigator.clipboard.writeText(text);
      feedback.textContent = 'Bestellung kopiert. Sie können sie in Ihre Nachricht an das Restaurant einfügen.';
    } catch {
      document.querySelector('#manual-copy-field').hidden = false;
      const field = document.querySelector('#manual-order-text');
      field.value = text; field.focus(); field.select();
      feedback.textContent = 'Bitte kopieren Sie den markierten Text und senden Sie ihn an das Restaurant.';
    }
  });
  renderCart();
})();
