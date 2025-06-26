import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faArrowRight,
  faClock,
  faBrain,
  faLightbulb,
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faLinkedin,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';

const HomePage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-x-hidden noise-texture'>
      {/* Animated Background Particles */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden z-0'>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className='absolute rounded-full opacity-5 dark:opacity-10 animate-pulse-slow'
            style={{
              background: `radial-gradient(circle, ${
                i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#8b5cf6' : '#ec4899'
              }, transparent)`,
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Hero Section */}
      <section className='py-16 md:py-24 lg:py-32 relative overflow-hidden z-10'>
        <div className='px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto'>
          <div className='text-center max-w-4xl mx-auto space-y-6'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-purple leading-tight animate-fade-in-scale'>
              Learn. Apply. Transform.
            </h1>
            <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gradient-blue font-semibold animate-slide-in-up'>
              Interactive Book Summaries
            </h2>
            <p
              className='text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slide-in-up'
              style={{ animationDelay: '0.2s' }}
            >
              Discover life-changing insights from the world's most influential
              books through immersive, interactive experiences with audio
              narration and actionable tips.
            </p>
            <div
              className='flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-scale'
              style={{ animationDelay: '0.4s' }}
            >
              <Link
                to='/seven-habits'
                className='inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold text-lg btn-hover-lift shadow-lg hover:shadow-xl transition-all duration-300'
                aria-label='Start learning with book summaries'
              >
                <FontAwesomeIcon icon={faBook} className='text-base' />
                Start Learning
                <FontAwesomeIcon icon={faArrowRight} className='text-base' />
              </Link>
            </div>

            {/* Social Media Links */}
            <div className="flex justify-center items-center gap-6 mt-8 animate-fade-in-scale" style={{ animationDelay: '0.6s' }}>
              <a 
                href="https://github.com/deoninja" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                aria-label="GitHub Profile"
              >
                <FontAwesomeIcon icon={faGithub} className="text-3xl" />
              </a>
              <a 
                href="https://www.linkedin.com/in/deonin/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-500 transition-colors duration-300"
                aria-label="LinkedIn Profile"
              >
                <FontAwesomeIcon icon={faLinkedin} className="text-3xl" />
              </a>
              <a 
                href="https://www.facebook.com/deo.trinidad/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-600 transition-colors duration-300"
                aria-label="Facebook Profile"
              >
                <FontAwesomeIcon icon={faFacebook} className="text-3xl" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className='py-16 md:py-24 lg:py-32 relative z-10'>
        <div className='px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto'>
          <div className='text-center space-y-6 mb-12'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-purple animate-slide-in-down'>
              Featured Book Summaries
            </h2>
            <p className='text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-scale'>
              Explore our collection of interactive book summaries designed to
              help you learn faster and retain more.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 justify-items-center'>
            {/* 7 Habits Card */}
            <div className='group glass dark:glass-dark rounded-2xl shadow-xl overflow-hidden border border-white/20 dark:border-white/10 card-hover flex flex-col h-full animate-fade-in-up stagger-1 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2'>
              <div className='relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
                <FontAwesomeIcon
                  icon={faLightbulb}
                  className='text-4xl text-white opacity-90 transition-transform duration-300 group-hover:scale-110'
                />
                <div className='absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300' />
              </div>
              <div className='p-6 flex-1 flex flex-col'>
                <div className='flex-1 space-y-4'>
                  <h3 className='text-xl font-bold text-gradient-purple leading-tight'>
                    The 7 Habits of Highly Effective People
                  </h3>
                  <p className='text-sm text-gray-700 dark:text-gray-300 leading-relaxed'>
                    Master Stephen Covey's timeless principles for personal and
                    professional effectiveness through interactive lessons and
                    practical exercises.
                  </p>
                  <div className='flex flex-wrap gap-2 mt-4'>
                    <span className='px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full'>
                      Personal Development
                    </span>
                    <span className='px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs font-medium rounded-full'>
                      Leadership
                    </span>
                  </div>
                </div>
                <Link
                  to='/seven-habits'
                  className='inline-flex items-center justify-center gap-2 w-full px-6 py-3 mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold text-sm btn-hover-lift shadow-lg hover:shadow-xl transition-all duration-300'
                  aria-label='Explore The 7 Habits of Highly Effective People summary'
                >
                  Explore Summary
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className='transition-transform group-hover:translate-x-1'
                  />
                </Link>
              </div>
            </div>

            {/* 5 AM Club Card */}
            <div className='group glass dark:glass-dark rounded-2xl shadow-xl overflow-hidden border border-white/20 dark:border-white/10 card-hover flex flex-col h-full animate-fade-in-up stagger-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2'>
              <div className='relative h-48 bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center'>
                <FontAwesomeIcon
                  icon={faClock}
                  className='text-4xl text-white opacity-90 transition-transform duration-300 group-hover:scale-110'
                />
                <div className='absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300' />
              </div>
              <div className='p-6 flex-1 flex flex-col'>
                <div className='flex-1 space-y-4'>
                  <h3 className='text-xl font-bold text-gradient-orange leading-tight'>
                    The 5 AM Club
                  </h3>
                  <p className='text-sm text-gray-700 dark:text-gray-300 leading-relaxed'>
                    Transform your life one morning at a time with Robin
                    Sharma's revolutionary morning routine and peak performance
                    strategies.
                  </p>
                  <div className='flex flex-wrap gap-2 mt-4'>
                    <span className='px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs font-medium rounded-full'>
                      Productivity
                    </span>
                    <span className='px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-xs font-medium rounded-full'>
                      Morning Routine
                    </span>
                  </div>
                </div>
                <Link
                  to='/five-am-club'
                  className='inline-flex items-center justify-center gap-2 w-full px-6 py-3 mt-6 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl font-semibold text-sm btn-hover-lift shadow-lg hover:shadow-xl transition-all duration-300'
                  aria-label='Explore The 5 AM Club summary'
                >
                  Explore Summary
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className='transition-transform group-hover:translate-x-1'
                  />
                </Link>
              </div>
            </div>

            {/* Learning How to Learn Card */}
            <div className='group glass dark:glass-dark rounded-2xl shadow-xl overflow-hidden border border-white/20 dark:border-white/10 card-hover flex flex-col h-full animate-fade-in-up stagger-3 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2'>
              <div className='relative h-48 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center'>
                <FontAwesomeIcon
                  icon={faBrain}
                  className='text-4xl text-white opacity-90 transition-transform duration-300 group-hover:scale-110'
                />
                <div className='absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300' />
              </div>
              <div className='p-6 flex-1 flex flex-col'>
                <div className='flex-1 space-y-4'>
                  <h3 className='text-xl font-bold text-gradient-green leading-tight'>
                    Learning How to Learn
                  </h3>
                  <p className='text-sm text-gray-700 dark:text-gray-300 leading-relaxed'>
                    Master the art of learning with proven techniques from
                    neuroscience and cognitive psychology to accelerate your
                    knowledge acquisition.
                  </p>
                  <div className='flex flex-wrap gap-2 mt-4'>
                    <span className='px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium rounded-full'>
                      Learning
                    </span>
                    <span className='px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 text-xs font-medium rounded-full'>
                      Memory
                    </span>
                  </div>
                </div>
                <Link
                  to='/learning-how-to-learn'
                  className='inline-flex items-center justify-center gap-2 w-full px-6 py-3 mt-6 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-xl font-semibold text-sm btn-hover-lift shadow-lg hover:shadow-xl transition-all duration-300'
                  aria-label='Explore Learning How to Learn summary'
                >
                  Explore Summary
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className='transition-transform group-hover:translate-x-1'
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='glass dark:scene-glass-dark py-16 md:py-24 lg:py-32 z-10 relative'>
        <div className='px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto'>
          <div className='text-center space-y-6 mb-16'>
            <h2 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gradient-purple animate-slide-in-down'>
              Why Choose Interactive Learning?
            </h2>
            <p className='text-xl sm:text-2xl md:text-3xl text-gray-800 dark:text-gray-200 max-w-5xl mx-auto leading-relaxed animate-fade-in-scale'>
              Our interactive approach helps you understand, remember, and apply
              key concepts more effectively.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14'>
            <div className='text-center p-12 lg:p-16 rounded-3xl glass dark:glass-dark border border-blue-100 dark:border-blue-800 animate-fade-in-scale stagger-1'>
              <div className='w-24 h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-8 animate-fade-in-up transition-transform duration-300 hover:scale-105 hover:shadow-lg'>
                <FontAwesomeIcon
                  icon={faBook}
                  className='text-2xl lg:text-3xl text-white'
                />
              </div>
              <h3 className='text-2xl lg:text-3xl font-bold text-gradient-blue mb-8 lg:mb-10'>
                Interactive Content
              </h3>
              <p className='text-lg text-gray-800 dark:text-gray-600 leading-relaxed'>
                Navigate through chapters, control audio playback, and engage
                with content at your own pace.
              </p>
            </div>

            <div className='text-center p-12 lg:p-16 rounded-3xl glass dark:glass-dark border border-purple-100 dark:border-purple-800 animate-fade-in-scale stagger-2'>
              <div className='w-24 h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-8 animate-fade-in-up transition-transform duration-300 hover:scale-105 hover:shadow-lg'>
                <FontAwesomeIcon
                  icon={faLightbulb}
                  className='text-2xl lg:text-3xl text-white'
                />
              </div>
              <h3 className='text-2xl lg:text-3xl font-bold text-gradient-purple mb-8 lg:mb-10'>
                Actionable Tips
              </h3>
              <p className='text-lg text-gray-800 dark:text-gray-600 leading-relaxed'>
                Get personalized, practical tips that you can immediately apply
                to your daily life and work.
              </p>
            </div>

            <div className='text-center p-12 lg:p-16 rounded-3xl glass dark:glass-dark border border-green-100 dark:border-green-800 animate-fade-in-scale stagger-3'>
              <div className='w-24 h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-8 animate-fade-in-up transition-transform duration-300 hover:scale-105 hover:shadow-lg'>
                <FontAwesomeIcon
                  icon={faBrain}
                  className='text-2xl lg:text-3xl text-white'
                />
              </div>
              <h3 className='text-2xl lg:text-3xl font-bold text-gradient-green mb-8 lg:mb-10'>
                Enhanced Learning
              </h3>
              <p className='text-lg text-gray-800 dark:text-gray-600 leading-relaxed'>
                Audio narration and visual elements help reinforce key concepts
                for better retention.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;