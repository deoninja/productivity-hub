import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepBackward, faStepForward, faRedo, faLightbulb, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { theDailyStoicData } from '../data/theDailyStoicData';

const TheDailyStoic = () => {
  // State variables
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedTip, setGeneratedTip] = useState('');
  const [isLoadingTip, setIsLoadingTip] = useState(false);
  const [imageLoading, setImageLoading] = useState(true); // Added imageLoading state
  const utteranceRef = useRef(null);
  const progressInterval = useRef(null);
  const autoPlayRef = useRef(autoPlay);

  // Update autoPlayRef whenever autoPlay changes
  useEffect(() => {
    autoPlayRef.current = autoPlay;
  }, [autoPlay]);

  // Reset image loading when scene changes
  useEffect(() => {
    setImageLoading(true);
  }, [currentSceneIndex]);

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
    if (currentSceneIndex < theDailyStoicData.length - 1) {
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
      speakText(theDailyStoicData[currentSceneIndex].text);
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
        speakText(theDailyStoicData[currentSceneIndex].text);
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
      speakText(theDailyStoicData[currentSceneIndex].text);
    }
  }, [currentSceneIndex, autoPlay]);

  // Progress bar effect
  useEffect(() => {
    if (isPlaying && autoPlay) {
      const duration = theDailyStoicData[currentSceneIndex].text.length * 50;
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

  // Generate tip function with contextual Stoic tips
  const generateTip = async () => {
    setIsLoadingTip(true);
    setGeneratedTip('');

    const currentScene = theDailyStoicData[currentSceneIndex];
    
    // Comprehensive collection of Stoic tips organized by scene context
    const tipsByScene = {
      0: [ // The Philosophy of Stoicism
        "Start your day with a Stoic meditation. Reflect on what you can control and what you cannot.",
        "Practice the view from above: Imagine looking down on your life from a great height to gain perspective on what truly matters.",
        "Identify one thing in your life that you're taking for granted and practice gratitude for it today.",
        "Write down three things that are within your control today and focus your energy on those."
      ],
      1: [ // The Daily Practice
        "Set aside 10 minutes this morning for silent reflection. Focus on your breath and observe your thoughts without judgment.",
        "Create a morning ritual that includes journaling about your intentions for the day.",
        "Practice mindfulness during a routine activity today, such as drinking coffee or walking.",
        "Before reacting to a challenging situation, pause and count to ten to create space for a thoughtful response."
      ],
      2: [ // The Four Virtues
        "Identify which of the four virtues you need most today and consciously practice it.",
        "Reflect on a recent decision and evaluate it against the four virtues of Stoicism.",
        "Choose one virtue to focus on this week and journal about your progress each evening.",
        "When faced with a moral dilemma, ask yourself what a wise, courageous, just, and temperate person would do."
      ],
      3: [ // Amor Fati
        "Identify one challenge in your life today and reframe it as an opportunity for growth.",
        "Practice saying 'This is for my good' when something unexpected happens.",
        "Write about a past difficulty and how it ultimately benefited you or taught you something valuable.",
        "Accept something small that you normally resist today, like bad weather or a minor inconvenience."
      ],
      4: [ // Memento Mori
        "Write your own eulogy to clarify what you want your legacy to be.",
        "Place a reminder of mortality (like a skull image or hourglass) where you'll see it daily.",
        "Before making a decision, ask if it will matter on your deathbed.",
        "Spend 5 minutes contemplating what you would do today if it were your last day."
      ],
      5: [ // The Dichotomy of Control
        "Make a list of your current worries and categorize them as within or outside your control.",
        "Practice letting go of one thing outside your control today.",
        "When stressed, ask: 'Is this within my control?' If not, consciously release it.",
        "Focus your energy today only on what you can directly influence."
      ],
      6: [ // Stoic Exercises
        "Try negative visualization: Imagine losing something you value to appreciate it more.",
        "Practice voluntary discomfort today - take a cold shower or skip a meal.",
        "Journal about three things you're grateful for and why.",
        "Write a letter to yourself from the perspective of your future self looking back on today."
      ],
      7: [ // Modern Stoicism
        "Apply Stoic principles to a modern problem like social media or work stress.",
        "Identify one area of modern life where Stoicism could bring you more peace.",
        "Share a Stoic quote with a friend and discuss its modern application.",
        "Create a Stoic response plan for a recurring stressor in your life."
      ],
      8: [ // Stoic Leaders
        "Read a passage from Marcus Aurelius' Meditations today.",
        "Research how a modern leader you admire applies Stoic principles.",
        "Emulate a Stoic leader's approach to a challenge you're facing.",
        "Identify which Stoic philosopher you resonate with most and study their teachings."
      ],
      9: [ // Your Stoic Journey
        "Commit to one small Stoic practice daily for the next week.",
        "Find an accountability partner to discuss your Stoic journey with.",
        "Create a morning ritual that incorporates Stoic reflection.",
        "Start a Stoic journal to track your progress and insights."
      ]
    };

    // General Stoic tips that apply to any scene
    const generalTips = [
      "Practice the discipline of assent: pause before accepting impressions as truth.",
      "At day's end, review your actions through the lens of Stoic virtues.",
      "When angry, remember that anger is temporary insanity - wait before acting.",
      "See obstacles as opportunities to practice virtue.",
      "Focus on process over outcome - do your best and accept what happens.",
      "Remember that external things are indifferent - only your judgment gives them power.",
      "Practice empathy by considering others' perspectives and challenges.",
      "Limit desires to what's necessary and within your control.",
      "Accept what you cannot change with grace and dignity.",
      "Remember that adversity reveals character - welcome challenges as tests."
    ];

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Get scene-specific tips or fall back to general tips
      const sceneTips = tipsByScene[currentSceneIndex] || generalTips;
      const allAvailableTips = [...sceneTips, ...generalTips];
      
      // Select a random tip
      const randomTip = allAvailableTips[Math.floor(Math.random() * allAvailableTips.length)];
      
      setGeneratedTip(randomTip);
    } catch (error) {
      setGeneratedTip("Failed to generate tip. Remember: The key to Stoicism is focusing on what's within your control and accepting what is not.");
    } finally {
      setIsLoadingTip(false);
    }
  };

  const currentScene = theDailyStoicData[currentSceneIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden noise-texture">
      {/* Animated Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 opacity-30 blur-3xl rounded-full animate-morph z-0 pointer-events-none" style={{ filter: 'blur(80px)', top: '-8rem', left: '-8rem' }}></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-400 opacity-20 blur-3xl rounded-full animate-morph z-0 pointer-events-none" style={{ filter: 'blur(80px)', bottom: '-8rem', right: '-8rem' }}></div>
      
      {/* Header */}
      <div className="glass dark:glass-dark shadow-lg border-b border-white/20 dark:border-white/10 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px极-6 lg:px-8 py-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gradient-blue mb-2 animate-fade-in-scale">
              The Daily Stoic
            </h1>
            <p className="text-responsive-lg text-gray-700 dark:text-gray-300 animate-slide-in-up">
              Wisdom from Ryan Holiday and Stephen Hanselman
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
                <div className="h-2 bg-gray-200 dark:bg-gray-700">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 animate-gradient-x transition-all duration-100 rounded-full"
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
                      <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-base font-semib极old rounded-full animate-float animate-pulse-glow">
                        {currentSceneIndex + 1} of {theDailyStoicData.length}
                      </span>
                    </div>
                    
                    <h2 className="text-responsive-2xl md:text-responsive-3xl font-bold text-gradient-blue mb-4 leading-tight animate-slide-in-down">
                      {currentScene.title}
                    </h2>
                    
                    <p className="text-responsive-lg text-blue-600 dark:text-blue-400 font-semibold mb-6 animate-fade-in-scale">
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

                  {/* Image with loader */}
                  <div className="flex-shrink-0 md:w-96">
                    <div className="relative overflow-hidden rounded-2xl shadow-xl animate-float min-h-[288px] md:min-h-[384px]">
                      {imageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800">
                          <FontAwesomeIcon icon={faSpinner} className="animate-spin text-4xl text-blue-500" />
                        </div>
                      )}
                      <img 
                        src={currentScene.image} 
                        alt={currentScene.sceneTitle}
                        className={`w-full h-72 md:h-96 object-cover transition-transform duration-300 hover:scale-105 ${imageLoading ? 'invisible' : 'block'}`}
                        onLoad={() => setImageLoading(false)}
                        onError={() => setImageLoading(false)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="glass dark:glass-dark bg-opacity-80 dark:bg-opacity-80 px-10 py-8 border-t border-white/10 dark:border-white/10">
                <div className="flex flex-wrap items-center justify-center gap-4">
                  
                  <button
                    onClick={handlePrev}
                    disabled={currentSceneIndex === 0}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold btn-hover-lift shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <FontAwesomeIcon icon={faStepBackward} />
                    Previous
                  </button>

                  <button
                    onClick={togglePlay}
                    disabled={autoPlay}
                    className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg btn-hover-lift shadow-lg animate-pulse-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
                    disabled={currentSceneIndex === theDailyStoicData.length - 1}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold btn-hover-lift shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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

                {/* Stoic Tip Generation */}
                <div className="mt-8 pt-8 border-t border-white/10 dark:border-white/10">
                  <button
                    onClick={generateTip}
                    disabled={isLoadingTip}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-lg btn-hover-lift shadow-lg animate-pulse-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isLoadingTip ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                        Generating Tip...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faLightbulb} />
                        Get Stoic Wisdom
                      </>
                    )}
                  </button>

                  {generatedTip && (
                    <div className="mt-6 p-6 glass dark:glass-dark border border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-300 rounded-xl shadow-lg animate-fade-in-scale">
                      <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-gradient-blue">
                        <FontAwesomeIcon icon={faLightbulb} />
                        Your Stoic Insight:
                      </h3>
                      <p>{generatedTip}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Scene Navigation */}
          <div className="glass dark:glass-dark rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 p-8 animate-fade-in-scale">
            <h3 className="text-responsive-xl font-bold text-gradient-blue mb-8 text-center">
              Navigate Teachings
            </h3>
            
            <div className="space-y-3">
              {theDailyStoicData.map((scene, index) => (
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
                      ? 'bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 border-2 border-blue-500 dark:border-blue-400 text-blue-900 dark:text-blue-100 scale-105'
                      : 'bg-gray-50 dark:bg-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900 dark:hover:to-indigo-900 border-2 border-transparent text-gray-极900 dark:text-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold animate-float animate-pulse-glow ${
                      index === currentSceneIndex
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold truncate text-responsive-base">
                        {scene.title}
                      </p>
                      <p className="text-sm truncate text-gray-600 dark:text-gray-400">
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
            <div className="mt-10 glass dark:glass-dark rounded-2xl shadow-xl border border-white/20 dark:border-white/10 p-6 animate-fade-in-scale">
              <h3 className="text-lg font-bold text-gradient-blue mb-4 text-center">
                Progress
              </h3>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-300 animate-gradient-x"
                    style={{ width: `${((currentSceneIndex + 1) / theDailyStoicData.length) * 100}%` }}
                  />
                </div>
                <span className="text-base font-semibold text-gray-600 dark:text-gray-400">
                  {currentSceneIndex + 1}/{theDailyStoicData.length}
                </span>
              </div>
              
              <p className="text-base text-gray-600 dark:text-gray-400 text-center">
                {Math.round(((currentSceneIndex + 1) / theDailyStoicData.length) * 100)}% Complete
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheDailyStoic;
