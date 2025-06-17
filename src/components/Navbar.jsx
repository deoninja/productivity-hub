import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 dark:bg-gray-900 py-4 px-6 sticky top-0 z-50 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold hover:text-blue-300 transition-colors">
          Productivity Hub
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-300 hover:text-white font-medium transition-colors">
            Home
          </Link>
          <Link to="/seven-habits" className="text-gray-300 hover:text-white font-medium transition-colors">
            7 Habits
          </Link>
          <Link to="/five-am-club" className="text-gray-300 hover:text-white font-medium transition-colors">
            5 AM Club
          </Link>
          <Link to="/learning-how-to-learn" className="text-gray-300 hover:text-white font-medium transition-colors">
            Learning How to Learn
          </Link>
          <Link to="/principles" className="text-gray-300 hover:text-white font-medium transition-colors">
            Principles
          </Link>
          
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
        
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 718.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          
          <div className="flex flex-col cursor-pointer" onClick={toggleMenu}>
            <span className="w-6 h-0.5 bg-white my-0.5"></span>
            <span className="w-6 h-0.5 bg-white my-0.5"></span>
            <span className="w-6 h-0.5 bg-white my-0.5"></span>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-700 dark:bg-gray-800 py-4 px-6 absolute left-0 right-0 top-16 shadow-lg transition-colors duration-300">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-gray-300 hover:text-white font-medium transition-colors">
              Home
            </Link>
            <Link to="/seven-habits" className="text-gray-300 hover:text-white font-medium transition-colors">
              7 Habits
            </Link>
            <Link to="/five-am-club" className="text-gray-300 hover:text-white font-medium transition-colors">
              5 AM Club
            </Link>
            <Link to="/learning-how-to-learn" className="text-gray-300 hover:text-white font-medium transition-colors">
              Learning How to Learn
            </Link>
            <Link to="/principles" className="text-gray-300 hover:text-white font-medium transition-colors">
              Principles
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;