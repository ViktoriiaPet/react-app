import { useContext } from 'react';
import { ThemeContext } from '../providers/Theme';

export function ThemeButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="button">
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}
