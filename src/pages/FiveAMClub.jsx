import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepBackward, faStepForward, faRedo, faLightbulb, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { fiveAMClubData } from '../data/fiveAMClubData';

const FiveAMClub = () => {
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
    if (currentSceneIndex < fiveAMClubData.length - 1) {
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
      speakText(fiveAMClubData[currentSceneIndex].text);
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
        speakText(fiveAMClubData[currentSceneIndex].text);
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
      speakText(fiveAMClubData[currentSceneIndex].text);
    }
  }, [currentSceneIndex, autoPlay]);

  // Progress bar effect
  useEffect(() => {
    if (isPlaying && autoPlay) {
      const duration = fiveAMClubData[currentSceneIndex].text.length * 50;
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

  // Generate tip function with contextual 5 AM Club tips
  const generateTip = async () => {
    setIsLoadingTip(true);
    setGeneratedTip('');

    const currentScene = fiveAMClubData[currentSceneIndex];
    
    // Comprehensive collection of 5 AM Club tips organized by scene context
    const tipsByScene = {
      0: [ // The Power of 5 AM
        "Start with just 10 minutes tomorrow morning. Set your alarm for 5:50 AM instead of 6:00 AM, and use those 10 minutes for deep breathing or journaling. Small steps lead to big transformations.",
        "Place your alarm clock across the room so you have to physically get up to turn it off. This simple trick eliminates the snooze button temptation.",
        "Prepare everything the night before: lay out your workout clothes, set up your journal, and have your morning tea ready. Remove all friction from your 5 AM routine.",
        "Use the '5-4-3-2-1' countdown method when your alarm goes off. Count backwards from 5 and physically move your body on '1'. This bypasses your brain's resistance to getting up."
      ],
      1: [ // The Elite Performer's Secret
        "Study the morning routines of your heroes. Research how successful people in your field start their day and adapt their strategies to your lifestyle.",
        "Track your energy levels throughout the day for one week. Notice how waking up at 5 AM affects your afternoon productivity and evening mood.",
        "Create a 'Victory List' of 3 small wins you want to achieve before 7 AM. This gives your early morning purpose and momentum.",
        "Join or create a 5 AM accountability group. Share your morning wins with others who are also committed to early rising."
      ],
      2: [ // The Modern Fable
        "Find your 'why' for joining the 5 AM Club. Write down 3 specific life improvements you want to see in 90 days of early rising.",
        "Identify your biggest time waster in the evening and replace it with an earlier bedtime. Most 5 AM failures happen at 10 PM the night before.",
        "Create a bedtime ritual that signals to your brain it's time to wind down: dim lights, no screens, and perhaps some light reading or meditation.",
        "Use the 'Billionaire Mindset': Ask yourself 'What would someone earning $1M annually do with their 5-7 AM time?' Then do that."
      ],
      3: [ // The 20/20/20 Formula
        "Start with just ONE 20-minute block. Master 20 minutes of movement for 2 weeks before adding reflection and growth segments.",
        "For the MOVE segment: Try bodyweight exercises, yoga, or a brisk walk. No gym required - your living room is enough to get your blood flowing.",
        "For the REFLECT segment: Use the 5-minute journal method - write 3 gratitudes, 3 daily priorities, and 1 affirmation.",
        "For the GROW segment: Read just 10 pages of a personal development book, listen to a podcast, or watch an educational video. Small daily learning compounds massively."
      ],
      4: [ // The Victory Hour
        "Design your Victory Hour environment the night before: clear space, good lighting, inspiring music playlist, and all materials ready.",
        "Use the 'Phone in Airplane Mode' rule during your Victory Hour. No notifications, no distractions, just pure focus on your growth.",
        "Create a Victory Hour playlist with 3 songs: one energizing song for movement, one calming song for reflection, and one inspiring song for growth.",
        "Set a timer for each 20-minute segment. When it goes off, immediately transition to the next activity. This builds discipline and time awareness."
      ],
      5: [ // Twin Cycles of Performance
        "Follow the 90-minute work sprint rule: After your Victory Hour, work in focused 90-minute blocks with 20-minute breaks between them.",
        "Schedule your most important work during your biological prime time (usually 6-10 AM for 5 AM Club members).",
        "Practice the 'Digital Sunset' - turn off all screens 1 hour before your target bedtime to improve sleep quality and morning energy.",
        "Use the 'Energy Audit' technique: Rate your energy 1-10 every 2 hours for a week. Identify patterns and optimize your schedule around your natural rhythms."
      ],
      6: [ // The Four Interior Empires
        "MINDSET: Start each morning by reading one page from a philosophy or personal development book to feed your mind with wisdom.",
        "HEARTSET: Practice the 'Gratitude + Love' meditation - spend 5 minutes feeling grateful and sending love to people in your life.",
        "HEALTHSET: Do 10 push-ups and 10 squats immediately after waking up. This activates your body and builds the exercise habit gradually.",
        "SOULSET: Spend 5 minutes in nature during your Victory Hour, even if it's just sitting by a window or stepping outside briefly."
      ],
      7: [ // From Ordinary to Legendary
        "Adopt the 'Legendary Standard': Before any decision, ask 'What would the legendary version of myself do?' Then do that.",
        "Create a 'Daily Excellence Scorecard' with 5 key habits. Rate yourself 1-5 each day and aim for consistent 4s and 5s.",
        "Practice the 'Service Mindset': During your reflection time, think of one way you can help someone else that day. Legendary people serve others.",
        "Use the '1% Better Rule': Identify one tiny improvement you can make to your morning routine each week. Small improvements compound into legendary results."
      ],
      8: [ // Own Your Morning
        "Create a morning mantra that embodies your 5 AM Club commitment. Repeat it when your alarm goes off: 'I own my morning, I elevate my life.'",
        "Take a 'Morning Victory Photo' - a selfie or photo of your morning setup. Share it with your accountability partner or post it to stay motivated.",
        "Practice the 'Champion's Mindset': Remind yourself that every morning you wake up at 5 AM, you're already winning before most people even wake up.",
        "Design a 'Morning Uniform' - specific clothes you only wear during your Victory Hour. This creates a psychological trigger for peak performance."
      ],
      9: [ // Your 5 AM Journey Begins
        "Commit to the 66-day challenge: Research shows it takes 66 days to form a habit. Mark your calendar and celebrate each milestone.",
        "Create a 'Future Self Letter': Write a letter from your future self (1 year from now) thanking your present self for starting the 5 AM Club journey.",
        "Start tonight: Set your alarm for 5 AM tomorrow and place this note next to it: 'Your future self is counting on you. Get up and make it happen.'",
        "Remember: Every master was once a beginner. Your first week will be hard, your first month will be challenging, but your first year will be transformational."
      ]
    };

    // General 5 AM Club tips that apply to any scene
    const generalTips = [
      "Use the 'Two-Day Rule': Never allow yourself to skip your 5 AM routine two days in a row. One day off is recovery, two days is a broken habit.",
      "Create a 'Morning Wins Journal': Write down 3 things you accomplished during your Victory Hour each day. This builds positive momentum and motivation.",
      "Practice 'Micro-Commitments': If 5 AM feels impossible, start with 5:30 AM for one week, then 5:15 AM the next week, then 5 AM. Gradual change sticks.",
      "Use the 'Weekend Warrior' approach: Maintain your 5 AM routine on weekends too. Consistency is the key to making it a permanent lifestyle change.",
      "Implement the 'Evening Preparation Ritual': Lay out clothes, prepare breakfast, set up your workspace. Make your morning routine as frictionless as possible.",
      "Try the 'Accountability Text': Send a daily text to a friend or family member when you complete your Victory Hour. Social accountability is powerful.",
      "Use 'Habit Stacking': Attach your 5 AM routine to an existing habit. 'After I brush my teeth, I will do my 20/20/20 routine.'",
      "Practice the 'Energy Investment Mindset': View your Victory Hour as investing energy to earn more energy throughout the day, not spending it.",
      "Create a 'Morning Playlist': Curate 60 minutes of music that energizes and inspires you. Let music be your morning companion.",
      "Use the 'Progress Photo Method': Take a photo of yourself each morning for 30 days. Watch your confidence and energy visibly improve over time."
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
      setGeneratedTip("Failed to generate tip. Remember: The key to joining the 5 AM Club is starting small and staying consistent. Begin with just 10 minutes earlier tomorrow morning.");
    } finally {
      setIsLoadingTip(false);
    }
  };

  const currentScene = fiveAMClubData[currentSceneIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden noise-texture">
      {/* Animated Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-400 opacity-30 blur-3xl rounded-full animate-morph z-0 pointer-events-none" style={{ filter: 'blur(80px)', top: '-8rem', left: '-8rem' }}></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-red-400 via-pink-400 to-orange-400 opacity-20 blur-3xl rounded-full animate-morph z-0 pointer-events-none" style={{ filter: 'blur(80px)', bottom: '-8rem', right: '-8rem' }}></div>
      
      {/* Header */}
      <div className="glass dark:glass-dark shadow-lg border-b border-white/20 dark:border-white/10 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gradient-orange mb-2 animate-fade-in-scale">
              The 5 AM Club
            </h1>
            <p className="text-responsive-lg text-gray-700 dark:text-gray-300 animate-slide-in-up">
              Interactive Summary by Robin Sharma
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
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-600 animate-gradient-x transition-all duration-100 rounded-full"
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
                      <span className="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-base font-semibold rounded-full animate-float animate-pulse-glow">
                        {currentSceneIndex + 1} of {fiveAMClubData.length}
                      </span>
                    </div>
                    
                    <h2 className="text-responsive-2xl md:text-responsive-3xl font-bold text-gradient-orange mb-4 leading-tight animate-slide-in-down">
                      {currentScene.title}
                    </h2>
                    
                    <p className="text-responsive-lg text-orange-600 dark:text-orange-400 font-semibold mb-6 animate-fade-in-scale">
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
                    className="flex items-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold text-lg btn-hover-lift shadow-lg animate-pulse-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
                    disabled={currentSceneIndex === fiveAMClubData.length - 1}
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

                {/* 5 AM Club Tip Generation */}
                <div className="mt-8 pt-8 border-t border-white/10 dark:border-white/10">
                  <button
                    onClick={generateTip}
                    disabled={isLoadingTip}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl font-bold text-lg btn-hover-lift shadow-lg animate-pulse-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isLoadingTip ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                        Generating Tip...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faLightbulb} />
                        Get 5 AM Club Tip
                      </>
                    )}
                  </button>

                  {generatedTip && (
                    <div className="mt-6 p-6 glass dark:glass-dark border border-orange-200 dark:border-orange-700 text-orange-800 dark:text-orange-300 rounded-xl shadow-lg animate-fade-in-scale">
                      <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-gradient-orange">
                        <FontAwesomeIcon icon={faLightbulb} />
                        Your Actionable Tip:
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
            <h3 className="text-responsive-xl font-bold text-gradient-orange mb-8 text-center">
              Navigate Scenes
            </h3>
            
            <div className="space-y-3">
              {fiveAMClubData.map((scene, index) => (
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
                      ? 'bg-gradient-to-r from-orange-100 via-amber-100 to-yellow-100 dark:from-orange-900 dark:via-amber-900 dark:to-yellow-900 border-2 border-orange-500 dark:border-orange-400 text-orange-900 dark:text-orange-100 scale-105'
                      : 'bg-gray-50 dark:bg-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 dark:hover:from-orange-900 dark:hover:to-amber-900 border-2 border-transparent text-gray-900 dark:text-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold animate-float animate-pulse-glow ${
                      index === currentSceneIndex
                        ? 'bg-orange-500 text-white'
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
              <h3 className="text-lg font-bold text-gradient-orange mb-4 text-center">
                Progress
              </h3>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-amber-600 h-3 rounded-full transition-all duration-300 animate-gradient-x"
                    style={{ width: `${((currentSceneIndex + 1) / fiveAMClubData.length) * 100}%` }}
                  />
                </div>
                <span className="text-base font-semibold text-gray-600 dark:text-gray-400">
                  {currentSceneIndex + 1}/{fiveAMClubData.length}
                </span>
              </div>
              
              <p className="text-base text-gray-600 dark:text-gray-400 text-center">
                {Math.round(((currentSceneIndex + 1) / fiveAMClubData.length) * 100)}% Complete
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiveAMClub;