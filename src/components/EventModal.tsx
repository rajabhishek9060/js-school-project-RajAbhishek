import React, { useEffect, useRef } from 'react';

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
  triggerElement?: HTMLElement | null;
}

export const EventModal: React.FC<EventModalProps> = ({ 
  event, 
  isOpen, 
  onClose, 
  triggerElement 
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLSpanElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen && event) {
      // Store the element that had focus before opening modal
      lastFocusedElement.current = triggerElement || document.activeElement as HTMLElement;
      
      // Focus the close button when modal opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);

      // Add escape key listener
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    } else if (!isOpen && lastFocusedElement.current) {
      // Return focus to the element that had focus before modal opened
      lastFocusedElement.current.focus();
    }
  }, [isOpen, event, onClose, triggerElement]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Trap focus within modal
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      modalRef.current.addEventListener('keydown', handleTabKey);
      return () => modalRef.current?.removeEventListener('keydown', handleTabKey);
    }
  }, [isOpen]);

  if (!isOpen || !event) return null;

  return (
    <div 
      ref={modalRef}
      className="modal" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      onClick={onClose}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span 
          ref={closeButtonRef}
          id="close-modal" 
          className="close" 
          onClick={onClose} 
          tabIndex={0} 
          role="button"
          aria-label="Close modal"
        >
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
