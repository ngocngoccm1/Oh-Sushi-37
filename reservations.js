(() => {
  'use strict';
  const dialog = document.querySelector('#reservation-dialog');
  const form = document.querySelector('#reservation-form');
  const dateField = document.querySelector('#booking-date');
  const timeField = document.querySelector('#booking-time');
  const guestsField = document.querySelector('#booking-guests');
  const nameField = document.querySelector('#booking-name');
  const phoneField = document.querySelector('#booking-phone');
  const feedback = document.querySelector('#booking-feedback');
  const hoursHint = document.querySelector('#booking-hours');
  const schedule = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent).openingHoursSpecification;
  const {open} = window.RestaurantDialogs;
  const {openDraft, copyDraft} = window.RestaurantContact;
  const partsInBerlin = () => Object.fromEntries(new Intl.DateTimeFormat('en-CA', {timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'}).formatToParts(new Date()).map(part => [part.type, part.value]));
  const minutes = time => { const [h, m] = time.split(':').map(Number); return h * 60 + m; };

  function validate() {
    const now = partsInBerlin();
    const today = `${now.year}-${now.month}-${now.day}`;
    dateField.min = today;
    dateField.setCustomValidity(''); timeField.setCustomValidity(''); guestsField.setCustomValidity('');
    timeField.removeAttribute('min'); timeField.removeAttribute('max');
    hoursHint.textContent = 'Montag ab 08:00 Uhr, Mittwoch–Sonntag ab 11:30 Uhr. Dienstag ist Ruhetag.';
    if (dateField.value) {
      const date = new Date(`${dateField.value}T12:00:00Z`);
      if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== dateField.value || dateField.value < today) {
        dateField.setCustomValidity('Bitte wählen Sie ein Datum ab heute.');
      } else {
        const weekday = new Intl.DateTimeFormat('en-US', {weekday: 'long', timeZone: 'Europe/Berlin'}).format(date);
        const hours = schedule.find(entry => [].concat(entry.dayOfWeek).some(day => day.split('/').pop() === weekday));
        if (!hours || hours.opens === hours.closes) {
          dateField.setCustomValidity('Dienstag ist Ruhetag. Bitte wählen Sie einen anderen Tag.');
          hoursHint.textContent = 'Dienstag ist Ruhetag. Bitte wählen Sie einen anderen Tag.';
        } else {
          hoursHint.textContent = `Öffnungszeiten an diesem Tag: ${hours.opens}–${hours.closes} Uhr. Ihre Anfrage wird vom Restaurant bestätigt.`;
          timeField.min = hours.opens;
          const latest = minutes(hours.closes) - 1;
          timeField.max = `${String(Math.floor(latest / 60)).padStart(2, '0')}:${String(latest % 60).padStart(2, '0')}`;
          if (timeField.value) {
            const wanted = minutes(timeField.value);
            if (wanted < minutes(hours.opens) || wanted >= minutes(hours.closes)) timeField.setCustomValidity(`Bitte wählen Sie eine Zeit ab ${hours.opens} und vor ${hours.closes} Uhr.`);
            else if (dateField.value === today && wanted <= Number(now.hour) * 60 + Number(now.minute)) timeField.setCustomValidity('Diese Zeit liegt in der Vergangenheit. Bitte wählen Sie eine spätere Zeit.');
          }
        }
      }
    }
    const guests = Number(guestsField.value);
    if (guestsField.value && (!Number.isSafeInteger(guests) || guests < 1)) guestsField.setCustomValidity('Bitte geben Sie eine ganze Gästezahl ab 1 ein.');
  }
  function validRequest() {
    nameField.value = nameField.value.trim(); phoneField.value = phoneField.value.trim();
    validate();
    return form.reportValidity();
  }
  function requestText() {
    const date = new Date(`${dateField.value}T12:00:00Z`);
    const formatted = new Intl.DateTimeFormat('de-DE', {timeZone: 'Europe/Berlin', weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit'}).format(date);
    const lines = ['Reservierungsanfrage — Oh! Sushi 37', '', `Datum: ${formatted}`, `Zeitwunsch: ${timeField.value} Uhr (Ortszeit Erwitte)`, `Gäste: ${guestsField.value}`, '', `Name: ${nameField.value}`, `Telefon: ${phoneField.value}`];
    const notes = document.querySelector('#booking-notes').value.trim();
    if (notes) lines.push('', `Anmerkungen: ${notes}`);
    lines.push('', 'Bitte bestätigen Sie, ob Sie einen Tisch für uns reservieren können. Vielen Dank!');
    return lines.join('\n');
  }
  document.querySelectorAll('[data-open-reservation]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault(); validate();
    feedback.textContent = '';
    document.querySelector('#booking-manual-copy').hidden = true;
    open(dialog, link);
  }));
  [dateField, timeField, guestsField].forEach(field => field.addEventListener('input', () => { validate(); feedback.textContent = ''; }));
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!validRequest()) return;
    openDraft('Reservierungsanfrage — Oh! Sushi 37', requestText());
    feedback.textContent = 'Bitte senden Sie den Entwurf in Ihrem E-Mail-Programm. Ihre Reservierung ist erst nach Rückmeldung bestätigt. Falls sich kein Programm öffnet, kopieren Sie die Anfrage oder rufen Sie uns an.';
  });
  document.querySelector('#copy-reservation').addEventListener('click', async () => {
    if (!validRequest()) return;
    await copyDraft(requestText(), feedback, document.querySelector('#booking-manual-copy'), document.querySelector('#booking-copy-text'));
  });
  // Date/time constraints are refreshed every time the dialog opens or the request is submitted.
  validate();
})();
