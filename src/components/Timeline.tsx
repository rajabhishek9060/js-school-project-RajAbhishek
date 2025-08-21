import React from 'react';

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  image?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  onEventClick: (event: TimelineEvent, element: HTMLElement) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ events, onEventClick }) => {
  return (
    <section id="timeline" role="list" aria-label="Timeline events">
      {events.map((event, index) => (
        <div 
          key={`${event.year}-${index}`} 
          className="event-marker" 
          role="listitem"
          tabIndex={0}
          aria-label={`Event: ${event.title} from ${event.year}`}
          onClick={(e) => onEventClick(event, e.currentTarget as HTMLElement)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onEventClick(event, e.currentTarget as HTMLElement);
              e.preventDefault();
            }
          }}
        >
          <div className="event-dot"></div>
          <div className="event-content">
            <h3>{event.year}</h3>
            <p>{event.title}</p>
          </div>
        </div>
      ))}
    </section>
  );
};
