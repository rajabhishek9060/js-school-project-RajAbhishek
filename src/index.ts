import { fetchEvents } from './fetcher.js';
import { renderTimeline } from './renderer.js';
import { hideModal } from './modal.js';

const timeline = document.getElementById('timeline')!;
const modal = document.getElementById('modal')!;
const closeModal = document.getElementById('close-modal')!;

fetchEvents('events.json')
  .then(events => {
    renderTimeline(events, timeline);
  })
  .catch(err => console.error('Error loading events:', err));

closeModal.addEventListener('click', hideModal);
window.addEventListener('click', (e) => {
  if (e.target === modal) hideModal();
});
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) hideModal();
});
modal.classList.add('hidden');
