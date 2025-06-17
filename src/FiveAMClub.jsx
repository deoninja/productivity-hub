import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepBackward, faStepForward, faRedo, faLightbulb, faSpinner } from '@fortawesome/free-solid-svg-icons';

const FiveAMClub = () => {
  // Define the script scenes with enhanced data structure
  const script = [
    {
      id: 1,
      title: "The Power of 5 AM",
      description: "Transform your life one morning at a time",
      text: "Imagine transforming your life—one morning at a time. This is the powerful idea behind The 5 AM Club by Robin Sharma.",
      visual: "🌅",
      sceneTitle: "Calm sunrise timelapse",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      title: "The Elite Performer's Secret",
      description: "20 years of proven success strategies",
      text: "For over 20 years, Sharma taught elite performers a simple but life-changing habit: Wake up at 5:00 AM, and use your first hour to build the foundation for greatness.",
      visual: "⏰",
      sceneTitle: "Person waking up at 4:59 AM, stretching",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      title: "The Modern Fable",
      description: "Three unlikely companions on a journey",
      text: "Through a modern-day fable, we follow an entrepreneur and an artist guided by a mysterious billionaire mentor. Together, they learn the rituals of legendary leaders.",
      visual: "🤝",
      sceneTitle: "Entrepreneur, artist, and wise mentor",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 4,
      title: "The 20/20/20 Formula",
      description: "Your 60-minute victory hour blueprint",
      text: "The key? The 20/20/20 Formula—a 60-minute morning routine.\n20 minutes: Move – get your body active.\n20 minutes: Reflect – journal, meditate, or plan.\n20 minutes: Grow – read, learn, and sharpen your mind.",
      visual: "📝🏃🧠",
      sceneTitle: "The powerful morning routine formula",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 5,
      title: "The Victory Hour",
      description: "Rewire your brain for success",
      text: "This Victory Hour rewires your brain, boosts focus, and anchors you in calm confidence before the world wakes up.",
      visual: "🧘‍♀️📖",
      sceneTitle: "Person in peaceful morning meditation",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 6,
      title: "Twin Cycles of Performance",
      description: "Balance deep work with deep rest",
      text: "Sharma also teaches the Twin Cycles of Elite Performance—balancing deep work with deep rest. Because sustainable success comes from rhythm, not burnout.",
      visual: "💪😴",
      sceneTitle: "The rhythm of peak performance",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 7,
      title: "The Four Interior Empires",
      description: "Mindset, Heartset, Healthset, Soulset",
      text: "And it's not just about mindset. You must nurture all four 'interior empires': Mindset, Heartset, Healthset, and Soulset.",
      visual: "💖🧠💪✨",
      sceneTitle: "The four pillars of greatness",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 8,
      title: "From Ordinary to Legendary",
      description: "True greatness is earned daily",
      text: "True greatness is earned. Through daily habits, personal growth, and serving others, we move from ordinary to legendary.",
      visual: "🎯📈",
      sceneTitle: "The path to legendary status",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 9,
      title: "Own Your Morning",
      description: "Every master was once a beginner",
      text: "As Robin Sharma says: 'Own your morning. Elevate your life.' And remember—every master was once a beginner.",
      visual: "🌟",
      sceneTitle: "The journey to mastery begins",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 10,
      title: "Your 5 AM Journey Begins",
      description: "Start tomorrow and change your life",
      text: "🌅 Start tomorrow at 5 AM. It might just change your life.\n🎧 Based on Robin Sharma's best-selling book: The 5 AM Club",
      visual: "🚀",
      sceneTitle: "Your transformation starts now",
      image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    }
  ];

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
    if (currentSceneIndex < script.length - 1) {
      setCurrentSceneIndex(currentSceneIndex + 1);
    } else if (autoPlay) {
      // If we're at the end and auto-playing, stop auto-play
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
      speakText(script[currentSceneIndex].text);
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
        speakText(script[currentSceneIndex].text);
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
      speakText(script[currentSceneIndex].text);
    }
  }, [currentSceneIndex, autoPlay]);

  // Progress bar effect
  useEffect(() => {
    if (isPlaying && autoPlay) {
      const duration = script[currentSceneIndex].text.length * 50;
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

    const currentScene = script[currentSceneIndex];
    
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

  const currentScene = script[currentSceneIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
              The 5 AM Club
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Interactive Summary by Robin Sharma
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Scene Display */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              
              {/* Progress Bar */}
              {autoPlay && (
                <div className="h-1 bg-gray-200 dark:bg-gray-700">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-600 transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}

              {/* Scene Content */}
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  
                  {/* Text Content */}
                  <div className="flex-1">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-sm font-medium rounded-full">
                        {currentSceneIndex + 1} of {script.length}
                      </span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                      {currentScene.title}
                    </h2>
                    
                    <p className="text-xl text-orange-600 dark:text-orange-400 font-semibold mb-6">
                      {currentScene.description}
                    </p>
                    
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                        {currentScene.text}
                      </p>
                    </div>

                    {/* Large Visual Emoji */}
                    <div className="mt-6 text-center">
                      <span className="text-6xl md:text-8xl animate-pulse">
                        {currentScene.visual}
                      </span>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="flex-shrink-0 md:w-80">
                    <div className="relative overflow-hidden rounded-xl shadow-lg">
                      <img 
                        src={currentScene.image} 
                        alt={currentScene.sceneTitle}
                        className="w-full h-64 md:h-80 object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="bg-gray-50 dark:bg-gray-700 px-8 py-6 border-t border-gray-200 dark:border-gray-600">
                <div className="flex flex-wrap items-center justify-center gap-4">
                  
                  <button
                    onClick={handlePrev}
                    disabled={currentSceneIndex === 0}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <FontAwesomeIcon icon={faStepBackward} />
                    Previous
                  </button>

                  <button
                    onClick={togglePlay}
                    disabled={autoPlay}
                    className="flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
                  >
                    <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>

                  <button
                    onClick={toggleAutoPlay}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
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
                    disabled={currentSceneIndex === script.length - 1}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                    <FontAwesomeIcon icon={faStepForward} />
                  </button>

                  <button
                    onClick={handleRestart}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    <FontAwesomeIcon icon={faRedo} />
                    Restart
                  </button>
                </div>

                {/* AI Tip Generation */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                  <button
                    onClick={generateTip}
                    disabled={isLoadingTip}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
                  >
                    {isLoadingTip ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} spin />
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
                    <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-300 p-4 rounded-lg shadow-md">
                      <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
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
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Navigate Scenes
              </h3>
              
              <div className="space-y-3">
                {script.map((scene, index) => (
                  <button
                    key={scene.id}
                    onClick={() => {
                      setCurrentSceneIndex(index);
                      setIsPlaying(false);
                      setAutoPlay(false);
                      speechSynthesis.cancel();
                    }}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                      index === currentSceneIndex
                        ? 'bg-orange-100 dark:bg-orange-900 border-2 border-orange-500 dark:border-orange-400'
                        : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === currentSceneIndex
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold truncate ${
                          index === currentSceneIndex
                            ? 'text-orange-900 dark:text-orange-100'
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {scene.title}
                        </p>
                        <p className={`text-sm truncate ${
                          index === currentSceneIndex
                            ? 'text-orange-700 dark:text-orange-300'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {scene.description}
                        </p>
                      </div>
                      <div className="text-2xl">
                        {scene.visual}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Progress Overview */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Progress
              </h3>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-amber-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${((currentSceneIndex + 1) / script.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  {currentSceneIndex + 1}/{script.length}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {Math.round(((currentSceneIndex + 1) / script.length) * 100)}% Complete
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiveAMClub;