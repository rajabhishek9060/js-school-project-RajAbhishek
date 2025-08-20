import React from 'react';
import { TimelineEvent } from '../types/index';

interface EventMarkerProps {
  event: TimelineEvent;
  onClick: () => void;
}

export const EventMarker: React.FC<EventMarkerProps> = ({ event, onClick }) => {
  return (
    <div className="event-marker" onClick={onClick}>
      <div className="event-dot"></div>
      <div className="event-content">
        <h3>{event.year}</h3>
        <p>{event.title}</p>
      </div>
    </div>
  );
};
