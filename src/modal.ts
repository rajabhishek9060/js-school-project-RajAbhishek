import type { EventData } from './types.js';

export function showModal(event: EventData) {
  const modal = document.getElementById('modal')!;
  const modalTitle = document.getElementById('modal-title')!;
  const modalDate = document.getElementById('modal-date')!;
  const modalImage = document.getElementById('modal-image')! as HTMLImageElement;
  const modalDescription = document.getElementById('modal-description')!;

  modalTitle.textContent = event.title;
  if (event.date) {
    const parts = event.date.split(',');
    modalDate.textContent = parts && parts[0] ? parts[0].trim() : '';
  } else {
    modalDate.textContent = '';
  }
  modalImage.src = event.imageURL || '';
  modalImage.alt = event.title;
  modalImage.onerror = () => {
    modalImage.src = 'https://via.placeholder.com/600x300?text=No+Image';
  };
  modalDescription.textContent = event.description;
  modal.classList.remove('hidden');
}

export function hideModal() {
  const modal = document.getElementById('modal')!;
  modal.classList.add('hidden');
}
