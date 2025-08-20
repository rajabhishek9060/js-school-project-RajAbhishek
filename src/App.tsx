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

  const handleEventClick = (event: TimelineEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
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
      />
    </div>
  );
}

export default App;
