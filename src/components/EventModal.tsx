import React from 'react';

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  image?: string;
}

interface EventModalProps {
  event: TimelineEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, isOpen, onClose }) => {
  if (!isOpen || !event) return null;

  return (
    <div className="modal" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span id="close-modal" className="close" onClick={onClose} tabIndex={0} aria-label="Close">
          &times;
        </span>
        <h2 id="modal-title">{event.title}</h2>
        <p id="modal-date">{event.year}</p>
        {event.image && (
          <img 
            id="modal-image" 
            src={event.image} 
            alt={event.title} 
            style={{ maxWidth: '100%', borderRadius: '8px' }}
          />
        )}
        <p id="modal-description">{event.description}</p>
      </div>
    </div>
  );
};
