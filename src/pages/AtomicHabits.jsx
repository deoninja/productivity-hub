import React, { useState, useEffect, useRef, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepBackward, faStepForward, faRedo, faLightbulb, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { atomicHabitsData } from '../data/atomicHabitsData';
import { useTheme } from '../context/ThemeContext';


const AtomicHabits = () => {
  const { darkMode } = useTheme();
  
  // State variables
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedTip, setGeneratedTip] = useState('');
  const [isLoadingTip, setIsLoadingTip] = useState(false);
  const utteranceRef = useRef(null);
  const progressInterval = useRef(null);
  const autoPlayRef = useRef(autoPlay);

  // Update autoPlayRef whenever autoPlay changes
  useEffect(() => {
    autoPlayRef.current = autoPlay;
  }, [autoPlay]);

  // Speech synthesis function
  const speakText = (text) => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1;
    utterance.rate = 0.9;

    utterance.onend = () => {
      setIsPlaying(false);
      if (autoPlayRef.current) {
        handleNext();
      }
    };

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  // Navigation handlers
  const handleNext = () => {
    if (currentSceneIndex < atomicHabitsData.length - 1) {
      setCurrentSceneIndex(currentSceneIndex + 1);
    } else if (autoPlay) {
      setAutoPlay(false);
    }
  };

  const handlePrev = () => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex(currentSceneIndex - 1);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      setAutoPlay(false);
    } else {
      speakText(atomicHabitsData[currentSceneIndex].text);
    }
  };

  const toggleAutoPlay = () => {
    if (autoPlay) {
      setAutoPlay(false);
      speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      setAutoPlay(true);
      if (!isPlaying) {
        speakText(atomicHabitsData[currentSceneIndex].text);
      }
    }
  };

  const handleRestart = () => {
    speechSynthesis.cancel();
    setCurrentSceneIndex(0);
    setIsPlaying(false);
    setAutoPlay(false);
    setGeneratedTip('');
    setProgress(0);
  };

  // Auto-play effect
  useEffect(() => {
    if (autoPlay && !isPlaying) {
      speakText(atomicHabitsData[currentSceneIndex].text);
    }
  }, [currentSceneIndex, autoPlay]);

  // Progress bar effect
  useEffect(() => {
    if (isPlaying && autoPlay) {
      const duration = atomicHabitsData[currentSceneIndex].text.length * 50;
      const interval = 100;
      const steps = duration / interval;
      const increment = 100 / steps;

      progressInterval.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval.current);
            return 0;
          }
          return prev + increment;
        });
      }, interval);

      return () => clearInterval(progressInterval.current);
    } else {
      setProgress(0);
    }
  }, [currentSceneIndex, isPlaying, autoPlay]);

  // Generate tip function
  const generateTip = async () => {
    setIsLoadingTip(true);
    setGeneratedTip('');

    try {
      // Simulated tip generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const tips = [
        "Try the 'Two-Minute Rule': If a habit takes less than 2 minutes, do it immediately. This builds momentum and prevents procrastination.",
        "Use 'Habit Stacking': Pair a new habit with an existing one. For example, 'After I pour my coffee, I will meditate for one minute.'",
        "Design your environment: Make good habits obvious and easy. Place your running shoes by the door, or healthy snacks on the counter.",
        "Use 'Temptation Bundling': Pair an action you want to do with an action you need to do. Only watch your favorite show while exercising.",
        "Track your habits: Use a habit tracker to visualize your progress. Don't break the chain!",
        "Never miss twice: If you miss a day, get back on track immediately. One slip-up is an accident, two is the start of a new habit.",
        "Focus on identity: Instead of 'I want to run a marathon,' think 'I am a runner.' Your habits are a reflection of your identity.",
        "Make it unsatisfying: Increase the friction for bad habits. Unplug the TV after each use, or put unhealthy snacks out of sight.",
        "Automate good habits: Set up automatic bill payments, or pre-pack your gym bag the night before.",
        "Find an accountability partner: Share your goals with someone who can keep you on track and celebrate your wins."
      ];
      
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      setGeneratedTip(randomTip);
    } catch (error) {
      setGeneratedTip("Failed to generate tip. Try focusing on one small habit you can implement today.");
    } finally {
      setIsLoadingTip(false);
    }
  };

  const currentScene = atomicHabitsData[currentSceneIndex];

  return (
    <div className={`min-h-screen relative overflow-hidden noise-texture ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-gray-50 to-gray-100'
    }`}>
      {/* Animated Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400 opacity-30 blur-3xl rounded-full animate-morph z-0 pointer-events-none" style={{ filter: 'blur(80px)', top: '-8rem', left: '-8rem' }}></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-red-400 via-orange-300 to-yellow-200 opacity-20 blur-3xl rounded-full animate-morph z-0 pointer-events-none" style={{ filter: 'blur(80px)', bottom: '-8rem', right: '-8rem' }}></div>
      
      {/* Header */}
      <div className={`glass ${darkMode ? 'glass-dark' : 'glass-light'} shadow-lg ${
        darkMode ? 'border-b border-white/20' : 'border-b border-gray-300'
      } z-10 relative`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gradient-atomic mb-2 animate-fade-in-scale">
              Atomic Habits
            </h1>
          <p className={`text-responsive-lg animate-slide-in-up ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
              Master Your Habits, Master Your Life
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Scene Display */}
          <div className="lg:col-span-2">
            <div className="glass dark:glass-dark rounded-3xl shadow-2xl overflow-hidden border border-white/20 dark:border-white/10 animate-fade-in-scale">
              
              {/* Progress Bar */}
              {autoPlay && (
                <div className="h-2 bg-gray-700">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 to-orange-600 animate-gradient-x transition-all duration-100 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}

              {/* Scene Content */}
              <div className="p-10">
                <div className="flex flex-col md:flex-row gap-10">
                  
                  {/* Text Content */}
                  <div className="flex-1">
                    <div className="mb-4">
                      <span className="inline-block px-4 py-2 bg-red-900 text-red-200 text-base font-semibold rounded-full animate-float animate-pulse-glow">
                        {currentSceneIndex + 1} of {atomicHabitsData.length}
                      </span>
                    </div>
                    
                    <h2 className="text-responsive-2xl md:text-responsive-3xl font-bold text-gradient-atomic mb-4 leading-tight animate-slide-in-down">
                      {currentScene.title}
                    </h2>
                    
                    <p className="text-responsive-lg text-orange-400 font-semibold mb-6 animate-fade-in-scale">
                      {currentScene.description}
                    </p>
                    
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                        {currentScene.text}
                      </p>
                    </div>

                    {/* Large Visual Emoji */}
                    <div className="mt-8 text-center">
                      <span className="text-8xl md:text-9xl animate-pulse animate-float">
                        {currentScene.visual}
                      </span>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="flex-shrink-0 md:w-96">
                    <div className="relative overflow-hidden rounded-2xl shadow-xl animate-float">
                      <img 
                        src={currentScene.image} 
                        alt={currentScene.sceneTitle}
                        className="w-full h-72 md:h-96 object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className={`absolute inset-0 ${
                        darkMode ? 'bg-gradient-to-t from-black/20 to-transparent' : 'bg-gradient-to-t from-white/20 to-transparent'
                      }`} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className={`glass ${darkMode ? 'glass-dark' : 'glass-light'} bg-opacity-80 px-10 py-8 border-t ${
                darkMode ? 'border-white/10' : 'border-gray-300'
              }`}>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  
                  <button
                    onClick={handlePrev}
                    disabled={currentSceneIndex === 0}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-gray-300 rounded-xl font-semibold btn-hover-lift shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <FontAwesomeIcon icon={faStepBackward} />
                    Previous
                  </button>

                  <button
                    onClick={togglePlay}
                    disabled={autoPlay}
                    className="flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-lg btn-hover-lift shadow-lg animate-pulse-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>

                  <button
                    onClick={toggleAutoPlay}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-lg btn-hover-lift shadow-md transition-all ${
                      autoPlay 
                        ? 'bg-red-600 hover:bg-red-700 text-white' 
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    <FontAwesomeIcon icon={autoPlay ? faPause : faPlay} />
                    {autoPlay ? 'Stop Auto' : 'Auto Play'}
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={currentSceneIndex === atomicHabitsData.length - 1}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-gray-300 rounded-xl font-semibold btn-hover-lift shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Next
                    <FontAwesomeIcon icon={faStepForward} />
                  </button>

                  <button
                    onClick={handleRestart}
                    className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-lg btn-hover-lift shadow-md transition-all"
                  >
                    <FontAwesomeIcon icon={faRedo} />
                    Restart
                  </button>
                </div>

                {/* Learning Tip Generation */}
                <div className="mt-8 pt-8 border-t border-white/10 dark:border-white/10">
                  <button
                    onClick={generateTip}
                    disabled={isLoadingTip}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white rounded-xl font-bold text-lg btn-hover-lift shadow-lg animate-pulse-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isLoadingTip ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                        Generating Habit Tip...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faLightbulb} />
                        Get Habit Tip
                      </>
                    )}
                  </button>

                  {generatedTip && (
                    <div className="mt-6 p-6 glass dark:glass-dark border border-red-700 text-red-300 rounded-xl shadow-lg animate-fade-in-scale">
                      <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-gradient-atomic">
                        <FontAwesomeIcon icon={faLightbulb} />
                        Your Habit Tip:
                      </h3>
                      <p>{generatedTip}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Scene Navigation */}
          <div className={`glass ${darkMode ? 'glass-dark' : 'glass-light'} rounded-3xl shadow-2xl border ${
            darkMode ? 'border-white/20' : 'border-gray-300'
          } p-8 animate-fade-in-scale`}>
            <h3 className="text-responsive-xl font-bold text-gradient-atomic mb-8 text-center">
              Navigate Habits
            </h3>
            
            <div className="space-y-3">
              {atomicHabitsData.map((scene, index) => (
                <button
                  key={scene.id}
                  onClick={() => {
                    setCurrentSceneIndex(index);
                    setIsPlaying(false);
                    setAutoPlay(false);
                    speechSynthesis.cancel();
                  }}
                  className={`w-full text-left p-5 rounded-xl font-semibold transition-all duration-200 card-hover btn-hover-lift shadow-md ${
                    index === currentSceneIndex
                      ? 'bg-gradient-to-r from-red-900 via-orange-900 to-yellow-900 border-2 border-red-500 text-red-100 scale-105'
                      : 'dark:bg-gray-700 hover:bg-gradient-to-r hover:from-red-900 hover:to-orange-900 border-2 border-transparent dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold animate-float animate-pulse-glow ${
                      index === currentSceneIndex
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold truncate text-responsive-base dark:text-gray-100">
                        {scene.title}
                      </p>
                      <p className="text-sm truncate text-orange-500">
                        {scene.description}
                      </p>
                    </div>
                    <div className="text-3xl animate-float">
                      {scene.visual}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Progress Overview */}
            <div className={`mt-10 glass ${darkMode ? 'glass-dark' : 'glass-light'} rounded-2xl shadow-xl border ${
              darkMode ? 'border-white/20' : 'border-gray-300'
            } p-6 animate-fade-in-scale`}>
              <h3 className="text-lg font-bold text-gradient-atomic mb-4 text-center">
                Progress
              </h3>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-red-500 to-orange-600 h-3 rounded-full transition-all duration-300 animate-gradient-x"
                    style={{ width: `${((currentSceneIndex + 1) / atomicHabitsData.length) * 100}%` }}
                  />
                </div>
                <span className="text-base font-semibold text-gray-400">
                  {currentSceneIndex + 1}/{atomicHabitsData.length}
                </span>
              </div>
              
              <p className="text-base text-gray-400 text-center">
                {Math.round(((currentSceneIndex + 1) / atomicHabitsData.length) * 100)}% Complete
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtomicHabits;
