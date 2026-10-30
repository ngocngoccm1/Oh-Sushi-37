(() => {
  'use strict';
  const schedule = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent).openingHoursSpecification;
  const localClock = new Intl.DateTimeFormat('en-CA', {timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'});
  const weekday = new Intl.DateTimeFormat('en-US', {weekday: 'long', timeZone: 'Europe/Berlin'});
  function now() {
    const parts = Object.fromEntries(localClock.formatToParts(new Date()).map(part => [part.type, part.value]));
    return {...parts, date: `${parts.year}-${parts.month}-${parts.day}`};
  }
  function validOn(entry, date) {
    return (!entry.validFrom || date >= entry.validFrom) && (!entry.validThrough || date <= entry.validThrough);
  }
  function forDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
    const date = new Date(`${value}T12:00:00Z`);
    if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) return null;
    const day = weekday.format(date);
    return schedule.find(entry => validOn(entry, value) && [].concat(entry.dayOfWeek).some(item => item.split('/').pop() === day)) || null;
  }
  window.RestaurantCalendar = {now, forDate};

  const periods = [...document.querySelectorAll('[data-hours-period]')];
  const promotion = document.querySelector('#promotion-notice');
  let lastDate;
  let timer;
  function refresh() {
    const {date} = now();
    periods.forEach(period => { period.hidden = !!period.dataset.validThrough && date > period.dataset.validThrough; });
    const active = periods.find(period => validOn({validFrom: period.dataset.validFrom, validThrough: period.dataset.validThrough}, date));
    if (active) document.querySelector('#hero-hours').textContent = active.dataset.shortHours;
    if (promotion) promotion.hidden = date > promotion.dataset.validThrough;
    if (lastDate && date !== lastDate) document.dispatchEvent(new Event('restaurant-calendar-change'));
    lastDate = date;
    // Berlin midnight aligns with a UTC minute. Refresh at the next minute boundary,
    // plus immediately when a background tab or a cached page becomes visible again.
    clearTimeout(timer);
    timer = setTimeout(refresh, 60000 - Date.now() % 60000 + 10);
  }
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
  window.addEventListener('pageshow', refresh);
  refresh();
})();
