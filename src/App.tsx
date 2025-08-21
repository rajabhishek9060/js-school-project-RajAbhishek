import { useState } from 'react';
import { Header } from './components/Header';
import { Timeline } from './components/Timeline';
import { EventModal } from './components/EventModal';
import { useTheme } from './hooks/useTheme';
import { useEvents } from './hooks/useEvents';

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  image?: string;
}

function App() {
  const { isDark, toggleTheme } = useTheme();
  const { events, loading, error } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);

  const handleEventClick = (event: TimelineEvent, element: HTMLElement) => {
    setSelectedEvent(event);
    setTriggerElement(element);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setTriggerElement(null);
  };

  if (loading) return <div className="loading">Loading timeline...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className={`app ${isDark ? 'dark' : ''}`}>
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      <main>
        <Timeline events={events} onEventClick={handleEventClick} />
      </main>
      <EventModal 
        event={selectedEvent} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        triggerElement={triggerElement}
      />
    </div>
  );
}

export default App;
