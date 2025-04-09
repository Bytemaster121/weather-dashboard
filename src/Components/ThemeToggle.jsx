import React from 'react';

const ThemeToggle = ({ toggleTheme }) => {
  return (
    <button 
      onClick={toggleTheme} 
      className="mb-4 bg-purple-400 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-200"
    >
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;