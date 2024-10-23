import React from 'react';
import '../styles/DarkModeToggle.css';

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <button 
      className={`dark-mode-toggle ${darkMode ? 'dark' : 'light'}`}
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default DarkModeToggle;