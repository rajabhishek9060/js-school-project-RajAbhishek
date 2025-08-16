import type { EventData } from './types';
import { showModal } from './modal.js';

export function renderTimeline(events: EventData[], timeline: HTMLElement) {
  events.forEach((event, index) => {
    const side = index % 2 === 0 ? 'left' : 'right';
    const item = document.createElement('div');
    item.className = `timeline-item ${side}`;
    item.tabIndex = 0;
    item.innerHTML = `
      <div class="content">
        <h3>${formatDate(event.date)}</h3>
        <h2>${event.title}</h2>
      </div>
    `;
    item.querySelector('.content')?.addEventListener('click', (e) => {
      e.stopPropagation();
      showModal(event);
    });
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        showModal(event);
      }
    });
    timeline.appendChild(item);
  });
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return '';
  const parts = dateStr?.split(',');
  return parts && parts[0] ? parts[0].trim() : '';
}
