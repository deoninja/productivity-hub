import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepBackward, faStepForward, faRedo, faLightbulb, faSpinner } from '@fortawesome/free-solid-svg-icons';

const LearningHowToLearn = () => {
  // Define the script scenes with enhanced data structure
  const script = [
    {
      id: 1,
      title: "The Meta-Skill Revolution",
      description: "Why some people learn faster than others",
      text: "Ever wondered why some people seem to pick up new skills effortlessly while others struggle? It's not just talent—it's about learning how to learn! This meta-skill will help you master any skill faster and make learning stick.",
      visual: "🧠",
      sceneTitle: "Brain lighting up with neural connections",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      title: "What is Learning How to Learn?",
      description: "Understanding the meta-skill that changes everything",
      text: "Learning how to learn is a meta-skill—it's about understanding how your brain works and using the best techniques to absorb and retain information. Whether you're studying for exams, picking up a new hobby, or advancing your career, these strategies will change the game.",
      visual: "🎯",
      sceneTitle: "Understanding the learning process",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      title: "How Your Brain Actually Learns",
      description: "The science behind memory and retention",
      text: "Your brain is like a muscle—the more you challenge it, the stronger it gets. But here's the catch: we forget stuff fast unless we review it. That's why spaced repetition—reviewing material over time—is key. Active learning, like testing yourself, beats passive reading every time.",
      visual: "🔬",
      sceneTitle: "Neural connections forming and strengthening",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 4,
      title: "Set Clear Goals & Stay Motivated",
      description: "The power of purpose-driven learning",
      text: "Know your 'why.' A clear purpose keeps you going. Set SMART goals—make them Specific, Measurable, Achievable, Relevant, and Time-bound. Instead of saying 'Learn guitar,' aim for 'Play three songs by next month.' Break big goals into small steps, and celebrate every win!",
      visual: "🎯",
      sceneTitle: "Writing goals and celebrating wins",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 5,
      title: "Spaced Repetition Magic",
      description: "Review at the perfect intervals",
      text: "Use spaced repetition with apps like Anki to review at the right intervals. This technique fights the forgetting curve by scheduling reviews just as you're about to forget. It's scientifically proven to boost long-term retention by up to 200%!",
      visual: "📚",
      sceneTitle: "Flashcards and spaced repetition system",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 6,
      title: "Active Recall Technique",
      description: "Test yourself instead of re-reading",
      text: "Try active recall—test yourself instead of re-reading notes. Close your book and try to explain what you just learned. This forces your brain to retrieve information, strengthening neural pathways. It's uncomfortable but incredibly effective!",
      visual: "🧩",
      sceneTitle: "Person quizzing themselves",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 7,
      title: "The Feynman Technique",
      description: "Teach to learn and spot knowledge gaps",
      text: "The Feynman Technique is awesome—teach what you've learned in simple terms to spot gaps. If you can't explain it simply, you don't understand it well enough. This technique reveals exactly what you need to study more.",
      visual: "👨‍🏫",
      sceneTitle: "Explaining concepts to others",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 8,
      title: "Pomodoro Technique for Focus",
      description: "Work smart with timed focus sessions",
      text: "For focus, use the Pomodoro Technique: work for 25 minutes, then take a 5-minute break. This maintains high concentration while preventing mental fatigue. After 4 pomodoros, take a longer 15-30 minute break. Your brain will thank you!",
      visual: "⏰",
      sceneTitle: "Timer counting down 25 minutes",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 9,
      title: "Build Learning Habits",
      description: "Consistency beats intensity every time",
      text: "Learning isn't a sprint—it's a habit. Start small, like 5 minutes a day, and build up. Tie learning to a trigger, like after breakfast, and reward yourself after. Optimize your environment: find a quiet space, minimize distractions, and study when you're most focused.",
      visual: "🏗️",
      sceneTitle: "Building consistent daily habits",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 10,
      title: "Take Care of Your Learning Machine",
      description: "Your brain needs proper fuel and rest",
      text: "Don't forget: your brain needs care. Get 7-9 hours of sleep—it's when memories solidify. Exercise boosts focus, and a balanced diet fuels your mind. Even a quick mindfulness practice can reduce stress and sharpen concentration. Treat your body well, and your learning will soar!",
      visual: "💪",
      sceneTitle: "Healthy lifestyle supporting learning",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 11,
      title: "Your Learning Journey Starts Now",
      description: "What will you master next?",
      text: "So, there you have it—your roadmap to learning how to learn! Start with one tip today, and watch how it transforms your skills. Remember: every expert was once a beginner. The difference is they never stopped learning. What will you learn next?",
      visual: "🚀",
      sceneTitle: "Beginning your learning transformation",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
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

  // Generate tip function
  const generateTip = async () => {
    setIsLoadingTip(true);
    setGeneratedTip('');

    const currentScene = script[currentSceneIndex];
    const prompt = `Based on the learning principles and the following scene content "${currentScene.text}", provide one concise, actionable tip that someone could apply to improve their learning effectiveness. Focus on practical advice related to study techniques, memory, or skill acquisition.`;

    try {
      // Simulated tip generation (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const tips = [
        "Try the 'Two-Minute Rule': If a learning task takes less than 2 minutes, do it immediately. This builds momentum and prevents procrastination.",
        "Use the 'Rubber Duck Method': Explain your learning material to an inanimate object. This forces you to organize your thoughts and identify gaps.",
        "Apply the '80/20 Rule': Focus 80% of your study time on the 20% of material that will give you the most results. Identify the core concepts first.",
        "Practice 'Interleaving': Mix different topics or skills in one study session rather than focusing on just one. This improves problem-solving abilities.",
        "Use 'Elaborative Interrogation': Ask yourself 'why' and 'how' questions about what you're learning to create deeper understanding.",
        "Try 'Dual Coding': Combine visual and verbal information. Draw diagrams while reading, or create mind maps with both images and text.",
        "Implement 'Retrieval Practice': Close your notes and write down everything you remember. Then check what you missed and focus on those gaps.",
        "Use 'Spacing Effect': Review material at increasing intervals (1 day, 3 days, 1 week, 2 weeks) to maximize long-term retention."
      ];
      
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      setGeneratedTip(randomTip);
    } catch (error) {
      setGeneratedTip("Failed to generate tip. Try focusing on one small learning technique you can implement today.");
    } finally {
      setIsLoadingTip(false);
    }
  };

  const currentScene = script[currentSceneIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
              Learning How to Learn
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Master Any Skill Faster with Science-Based Techniques
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
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-100"
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
                      <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-sm font-medium rounded-full">
                        {currentSceneIndex + 1} of {script.length}
                      </span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                      {currentScene.title}
                    </h2>
                    
                    <p className="text-xl text-emerald-600 dark:text-emerald-400 font-semibold mb-6">
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
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
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
                        Generating Learning Tip...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faLightbulb} />
                        Get Learning Tip
                      </>
                    )}
                  </button>

                  {generatedTip && (
                    <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-300 p-4 rounded-lg shadow-md">
                      <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <FontAwesomeIcon icon={faLightbulb} />
                        Your Learning Tip:
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
                Navigate Lessons
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
                        ? 'bg-emerald-100 dark:bg-emerald-900 border-2 border-emerald-500 dark:border-emerald-400'
                        : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === currentSceneIndex
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold truncate ${
                          index === currentSceneIndex
                            ? 'text-emerald-900 dark:text-emerald-100'
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {scene.title}
                        </p>
                        <p className={`text-sm truncate ${
                          index === currentSceneIndex
                            ? 'text-emerald-700 dark:text-emerald-300'
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
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full transition-all duration-300"
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

export default LearningHowToLearn;