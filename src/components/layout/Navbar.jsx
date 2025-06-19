import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSun, 
  faMoon, 
  faBars, 
  faTimes, 
  faBook, 
  faClock, 
  faBrain,
  faHome,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import LHLOGO from '../../assets/LHLOGO.webp'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { path: '/', label: 'Home', icon: faHome },
    { path: '/seven-habits', label: '7 Habits', icon: faBook },
    { path: '/five-am-club', label: '5 AM Club', icon: faClock },
    { path: '/learning-how-to-learn', label: 'Learning', icon: faBrain },
    { path: '/atomic-habits', label: 'Atomic Habits', icon: faStar },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass dark:glass-dark border-b border-white/20 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <img src={LHLOGO} alt="logo" />
              </div>
              <h1 className="hidden sm:block text-xl font-bold text-gradient-purple">
                LearnHub
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    isActive(item.path)
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={item.icon} className="text-sm"/>
                    <span>{item.label}</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className="text-lg" />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors duration-200"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-lg" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
              onClick={toggleMenu}
              aria-hidden="true"
            ></div>
            
            {/* Menu Panel */}
            <div className="absolute top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out translate-x-0">
              <div className="flex justify-end p-4">
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                  aria-label="Close menu"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-xl" />
                </button>
              </div>
              <div className="px-4 py-2 overflow-y-auto max-h-[calc(100vh-5rem)]">
              <div className="grid gap-1 py-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-blue-100 dark:bg-blue-800/50 text-blue-700 dark:text-blue-300 shadow-inner'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:translate-x-1'
                    }`}
                    aria-current={isActive(item.path) ? "page" : undefined}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isActive(item.path)
                        ? 'bg-white/20'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}>
                      <FontAwesomeIcon icon={item.icon} className="text-sm"/>
                    </div>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-all duration-300 hover:scale-[1.02]">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Start Learning Today
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Transform your life with interactive book summaries
                </p>
                <button 
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-300"
                  onClick={toggleMenu}
                >
                  Get Started Free
                </button>
              </div>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      {/* Spacer to prevent content overlap */}
      <div className={`h-20 transition-all duration-300 ${isOpen ? 'blur-sm' : ''}`}></div>
    </>
  );
};

export default Navbar;
