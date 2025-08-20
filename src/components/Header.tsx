interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDark, toggleTheme }) => {
  return (
    <header>
      <h1>🕒 Timeline App</h1>
      <button id="theme-toggle" onClick={toggleTheme}>
        {isDark ? '☀️ Light' : '🌙 Dark'} Theme
      </button>
    </header>
  );
};
