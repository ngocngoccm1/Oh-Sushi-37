(() => {
  'use strict';
  const openers = new WeakMap();
  function close(dialog) { if (dialog.open) dialog.close(); }
  function open(dialog, trigger) {
    if (dialog.open) return;
    document.dispatchEvent(new Event('before-service-open'));
    const returnTo = trigger || document.activeElement;
    openers.set(dialog, returnTo.closest('.mobile-nav') ? document.querySelector('.nav-toggle') : returnTo);
    document.querySelectorAll('dialog[open]').forEach(other => { if (other !== dialog) close(other); });
    dialog.showModal();
    document.body.classList.add('order-open');
  }
  document.querySelectorAll('.order-dialog').forEach(dialog => {
    dialog.querySelector('[data-close-dialog]').addEventListener('click', () => close(dialog));
    dialog.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      const controls = [...dialog.querySelectorAll('button, a[href], input, select, textarea')].filter(control => !control.disabled && control.getClientRects().length);
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    dialog.addEventListener('close', () => {
      if (document.querySelector('dialog[open]')) return;
      document.body.classList.remove('order-open');
      const opener = openers.get(dialog);
      if (opener?.isConnected && opener.getClientRects().length) opener.focus({preventScroll: true});
    });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close(dialog);
    });
  });
  window.RestaurantDialogs = {open, close};
})();
