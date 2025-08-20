import { useState, useEffect } from 'react';

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  image?: string;
}

export const useEvents = () => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetch('/events.json');
        if (!response.ok) throw new Error('Failed to load events');
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return { events, loading, error };
};
