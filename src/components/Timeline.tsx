import React from 'react';

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  image?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  onEventClick: (event: TimelineEvent) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ events, onEventClick }) => {
  return (
    <section id="timeline">
      {events.map((event, index) => (
        <div key={`${event.year}-${index}`} className="event-marker" onClick={() => onEventClick(event)}>
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
