export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  image?: string;
}

export interface Theme {
  isDark: boolean;
  toggleTheme: () => void;
}
