import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 dark:text-gray-400 pt-12 pb-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white dark:text-gray-200 text-xl font-bold mb-4">Productivity Hub</h3>
          <p className="mb-4 max-w-xs">Your resource for personal growth and self-improvement</p>
        </div>
        
        <div>
          <h4 className="text-white dark:text-gray-200 text-lg font-semibold mb-4">Resources</h4>
          <ul className="space-y-2">
            <li><Link to="/seven-habits" className="hover:text-white dark:hover:text-gray-200 transition-colors">7 Habits Summary</Link></li>
            <li><Link to="/five-am-club" className="hover:text-white dark:hover:text-gray-200 transition-colors">5 AM Club Summary</Link></li>
            <li><Link to="/learning-how-to-learn" className="hover:text-white dark:hover:text-gray-200 transition-colors">Learning How to Learn</Link></li>
            <li><Link to="/principles" className="hover:text-white dark:hover:text-gray-200 transition-colors">Productivity Principles</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white dark:text-gray-200 text-lg font-semibold mb-4">Connect</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white dark:hover:text-gray-200 transition-colors">Twitter</a></li>
            <li><a href="#" className="hover:text-white dark:hover:text-gray-200 transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-white dark:hover:text-gray-200 transition-colors">Newsletter</a></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-800 dark:border-gray-700 mt-10 pt-6 text-center">
        <p>&copy; {new Date().getFullYear()} Productivity Hub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
