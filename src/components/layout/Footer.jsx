import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBook, 
  faClock, 
  faBrain, 
  faHeart, 
  faStar,
  faArrowUp,
  faEnvelope,
  faGlobe,
  faShare,
  faUsers,
  faCode,
  faLink
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-10 blur-3xl rounded-full animate-morph pointer-events-none" style={{ filter: 'blur(80px)' }}></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-green-400 via-teal-400 to-blue-400 opacity-10 blur-3xl rounded-full animate-morph pointer-events-none" style={{ filter: 'blur(80px)' }}></div>
      
      <div className="glass dark:glass-dark border-t border-white/20 dark:border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center animate-gradient-xy">
                    <FontAwesomeIcon 
                    icon={faStar} 
                    className="text-white text-xl animate-pulse" 
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-30"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    LearnHub
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Learn. Apply. Transform.
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Transform your life with interactive book summaries designed for the modern learner. 
                Experience knowledge like never before.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {[
                  { icon: faShare, href: '#', color: 'hover:text-blue-400', label: 'Share' },
                  { icon: faUsers, href: '#', color: 'hover:text-pink-400', label: 'Community' },
                  { icon: faGlobe, href: '#', color: 'hover:text-blue-600', label: 'Website' },
                  { icon: faCode, href: '#', color: 'hover:text-gray-600', label: 'Code' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-12 h-12 glass dark:glass-dark rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg shadow-md animate-fade-in-scale`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    aria-label={social.label}
                  >
                    <FontAwesomeIcon icon={social.icon} className="text-lg" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-gradient-purple mb-6">
                Book Summaries
              </h4>
              <ul className="space-y-4">
                {[
                  { to: '/seven-habits', label: '7 Habits Summary', icon: faBook },
                  { to: '/five-am-club', label: '5 AM Club Summary', icon: faClock },
                  { to: '/learning-how-to-learn', label: 'Learning How to Learn', icon: faBrain }
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.to} 
                      className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group animate-slide-in-left hover:translate-x-1"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="w-8 h-8 glass dark:glass-dark rounded-lg flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-all duration-300">
                        <FontAwesomeIcon icon={link.icon} className="text-sm" />
                      </div>
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-lg font-bold text-gradient-blue mb-6">
                Features
              </h4>
              <ul className="space-y-4">
                {[
                  'Interactive Content',
                  'Audio Narration',
                  'Actionable Tips',
                  'Progress Tracking',
                  'Dark Mode',
                  'Mobile Responsive'
                ].map((feature, index) => (
                  <li 
                    key={index}
                    className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 animate-slide-in-right"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-bold text-gradient-green mb-6">
                Stay Updated
              </h4>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Get the latest book summaries and learning tips delivered to your inbox.
              </p>
              
              <div className="space-y-4">
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 glass dark:glass-dark border border-white/20 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                        required
                        aria-required="true"
                        aria-label="Email address for newsletter"
                      />
                      <FontAwesomeIcon 
                        icon={faEnvelope} 
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
                      />
                    </div>
                
                <button 
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold btn-hover-lift shadow-lg animate-pulse-glow hover:shadow-xl transition-all duration-300"
                  type="submit"
                  aria-label="Subscribe to newsletter"
                >
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10 dark:border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              
              {/* Copyright */}
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <span>&copy; {new Date().getFullYear()} LearnHub. All rights reserved.</span>
                <FontAwesomeIcon icon={faHeart} className="text-red-500 animate-pulse" />
                <span>Made with passion for learning by: Deo Trinidad</span>
              </div>

              {/* Links */}
              <div className="flex items-center space-x-6">
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                  Terms of Service
                </a>
                <button
                  onClick={scrollToTop}
                  className="w-12 h-12 glass dark:glass-dark rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 btn-hover-lift shadow-lg transition-all duration-300 transform hover:scale-110"
                  aria-label="Scroll to top"
                >
                  <FontAwesomeIcon icon={faArrowUp} className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
