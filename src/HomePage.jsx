import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';

const HomePage = () => {
  const { darkMode } = useTheme();
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-900 to-purple-800 rounded-2xl overflow-hidden shadow-xl mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-900/30"></div>
        <div className="relative max-w-4xl mx-auto py-24 px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Transform Your Life Through <span className="text-yellow-300">Productivity</span>
          </h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-10">
            Discover powerful strategies for personal growth, self-improvement, and achieving your full potential
          </p>
          <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-indigo-900 font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            Start Your Journey
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Why Choose Productivity Hub?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Our curated resources help you build lasting habits, master time management, and unlock your true potential through proven methodologies
        </p>
      </div>

      {/* Book Highlights */}
      <div className="mb-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Featured <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Learning Resources</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Dive deep into transformative books and concepts that will revolutionize your approach to personal development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* 7 Habits Card */}
          <div className="group bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 flex flex-col h-full">
            <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 p-8 flex-1 flex flex-col">
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <span className="text-6xl">📚</span>
              </div>
              
              <div className="relative z-10 flex-1 flex flex-col">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl">📚</span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  7 Habits of Highly Effective People
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed flex-1">
                  Transform your personal and professional life with Stephen Covey's timeless principles for effectiveness
                </p>
                
                <div className="flex flex-col gap-4 mt-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Interactive</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">Available</span>
                    </div>
                  </div>
                  
                  <Link to="/seven-habits" className="group/btn relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold px-8 py-4 rounded-2xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 overflow-hidden w-full">
                    <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative z-10 text-lg">Explore Summary</span>
                    <svg className="relative z-10 w-6 h-6 group-hover/btn:translate-x-2 group-hover/btn:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 5 AM Club Card */}
          <div className="group bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 flex flex-col h-full">
            <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-900/30 dark:via-orange-900/30 dark:to-yellow-900/30 p-8 flex-1 flex flex-col">
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <span className="text-6xl">⏰</span>
              </div>
              
              <div className="relative z-10 flex-1 flex flex-col">
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl">⏰</span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  The 5 AM Club
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed flex-1">
                  Own your morning, elevate your life with Robin Sharma's transformative early rising routine
                </p>
                
                <div className="flex flex-col gap-4 mt-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Audio Ready</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">Available</span>
                    </div>
                  </div>
                  
                  <Link to="/five-am-club" className="group/btn relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white font-bold px-8 py-4 rounded-2xl hover:from-amber-700 hover:via-orange-700 hover:to-red-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 overflow-hidden w-full">
                    <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative z-10 text-lg">Explore Summary</span>
                    <svg className="relative z-10 w-6 h-6 group-hover/btn:translate-x-2 group-hover/btn:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 to-red-400 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Learning How to Learn Card */}
          <div className="group bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 flex flex-col h-full">
            <div className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-900/30 dark:via-teal-900/30 dark:to-cyan-900/30 p-8 flex-1 flex flex-col">
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <span className="text-6xl">🧠</span>
              </div>
              
              <div className="relative z-10 flex-1 flex flex-col">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl">🧠</span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  Learning How to Learn
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed flex-1">
                  Master any skill faster with science-based learning techniques and cognitive strategies
                </p>
                
                <div className="flex flex-col gap-4 mt-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Science-Based</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Available</span>
                    </div>
                  </div>
                  
                  <Link to="/learning-how-to-learn" className="group/btn relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-bold px-8 py-4 rounded-2xl hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 overflow-hidden w-full">
                    <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative z-10 text-lg">Explore Summary</span>
                    <svg className="relative z-10 w-6 h-6 group-hover/btn:translate-x-2 group-hover/btn:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Card */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 text-center border-2 border-dashed border-gray-300 dark:border-gray-600">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🚀</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">More Resources Coming Soon</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We're working on additional productivity principles and learning resources to help you achieve your goals
            </p>
            <button className="bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300 font-semibold px-6 py-3 rounded-xl cursor-not-allowed">
              Stay Tuned
            </button>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-10 mb-16 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-5xl mb-6 dark:text-gray-300">❝</div>
          <p className="text-2xl text-gray-700 dark:text-gray-300 italic mb-8">
            Productivity Hub gave me the tools to completely transform my daily routine. I've doubled my productivity while reducing stress!
          </p>
          <div className="flex items-center justify-center">
            <div className="relative w-16 h-16 mr-4">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                alt="Alex Johnson - Product Manager"
                className="w-16 h-16 rounded-xl object-cover shadow-lg border-2 border-white dark:border-gray-700"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
            </div>
            <div>
              <p className="font-bold text-gray-800 dark:text-white">Alex Johnson</p>
              <p className="text-indigo-600 dark:text-indigo-400">Product Manager</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-12 text-center mb-10">
        <h3 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Life?</h3>
        <p className="text-indigo-100 max-w-2xl mx-auto mb-8">
          Join thousands of others who have improved their productivity and achieved their goals
        </p>
        <button className="bg-white text-indigo-800 font-bold py-4 px-10 rounded-full shadow-lg hover:bg-indigo-50 transition-all duration-300">
          Get Started Today
        </button>
      </div>
    </div>
  );
};

export default HomePage;
