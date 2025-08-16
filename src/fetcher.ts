import type { EventData } from './types.js';

export async function fetchEvents(url: string): Promise<EventData[]> {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
}
