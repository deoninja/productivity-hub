import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepBackward, faStepForward, faRedo, faLightbulb, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { learningHowToLearnData } from '../data/learningHowToLearnData';

const LearningHowToLearn = () => {
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
    if (currentSceneIndex < learningHowToLearnData.length - 1) {
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
      speakText(learningHowToLearnData[currentSceneIndex].text);
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
        speakText(learningHowToLearnData[currentSceneIndex].text);
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
      speakText(learningHowToLearnData[currentSceneIndex].text);
    }
  }, [currentSceneIndex, autoPlay]);

  // Progress bar effect
  useEffect(() => {
    if (isPlaying && autoPlay) {
      const duration = learningHowToLearnData[currentSceneIndex].text.length * 50;
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
        "Try the 'Two-Minute Rule': If a learning task takes less than 2 minutes, do it immediately. This builds momentum and prevents procrastination.",
        "Use the 'Rubber Duck Method': Explain your learning material to an inanimate object. This forces you to organize your thoughts and identify gaps.",
        "Apply the '80/20 Rule': Focus 80% of your study time on the 20% of material that will give you the most results. Identify the core concepts first.",
        "Practice 'Interleaving': Mix different topics or skills in one study session rather than focusing on just one. This improves problem-solving abilities.",
        "Use 'Elaborative Interrogation': Ask yourself 'why' and 'how' questions about what you're learning to create deeper understanding.",
        "Try 'Dual Coding': Combine visual and verbal information. Draw diagrams while reading, or create mind maps with both images and text.",
        "Implement 'Retrieval Practice': Close your notes and write down everything you remember. Then check what you missed and focus on those gaps.",
        "Use 'Spacing Effect': Review material at increasing intervals (1 day, 3 days, 1 week, 2 weeks) to maximize long-term retention.",
        "Practice the 'Feynman Technique': Explain complex concepts in simple terms as if teaching a child. This reveals knowledge gaps.",
        "Use 'Active Recall': Test yourself frequently instead of just re-reading. This strengthens memory pathways more effectively.",
        "Apply 'Pomodoro Technique': Study in 25-minute focused sessions with 5-minute breaks to maintain concentration and prevent burnout.",
        "Create 'Memory Palaces': Associate information with familiar locations to improve recall through spatial memory techniques."
      ];
      
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      setGeneratedTip(randomTip);
    } catch (error) {
      setGeneratedTip("Failed to generate tip. Try focusing on one small learning technique you can implement today.");
    } finally {
      setIsLoadingTip(false);
    }
  };

  const currentScene = learningHowToLearnData[currentSceneIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden noise-texture">
      {/* Animated Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 opacity-30 blur-3xl rounded-full animate-morph z-0 pointer-events-none" style={{ filter: 'blur(80px)', top: '-8rem', left: '-8rem' }}></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 opacity-20 blur-3xl rounded-full animate-morph z-0 pointer-events-none" style={{ filter: 'blur(80px)', bottom: '-8rem', right: '-8rem' }}></div>
      
      {/* Header */}
      <div className="glass dark:glass-dark shadow-lg border-b border-white/20 dark:border-white/10 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gradient-green mb-2 animate-fade-in-scale">
              Learning How to Learn
            </h1>
            <p className="text-responsive-lg text-gray-700 dark:text-gray-300 animate-slide-in-up">
              Master Any Skill Faster with Science-Based Techniques
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
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 animate-gradient-x transition-all duration-100 rounded-full"
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
                      <span className="inline-block px-4 py-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-base font-semibold rounded-full animate-float animate-pulse-glow">
                        {currentSceneIndex + 1} of {learningHowToLearnData.length}
                      </span>
                    </div>
                    
                    <h2 className="text-responsive-2xl md:text-responsive-3xl font-bold text-gradient-green mb-4 leading-tight animate-slide-in-down">
                      {currentScene.title}
                    </h2>
                    
                    <p className="text-responsive-lg text-emerald-600 dark:text-emerald-400 font-semibold mb-6 animate-fade-in-scale">
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
                    className="flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg btn-hover-lift shadow-lg animate-pulse-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
                    disabled={currentSceneIndex === learningHowToLearnData.length - 1}
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

                {/* Learning Tip Generation */}
                <div className="mt-8 pt-8 border-t border-white/10 dark:border-white/10">
                  <button
                    onClick={generateTip}
                    disabled={isLoadingTip}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-bold text-lg btn-hover-lift shadow-lg animate-pulse-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isLoadingTip ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
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
                    <div className="mt-6 p-6 glass dark:glass-dark border border-emerald-200 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 rounded-xl shadow-lg animate-fade-in-scale">
                      <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-gradient-green">
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
          <div className="glass dark:glass-dark rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 p-8 animate-fade-in-scale">
            <h3 className="text-responsive-xl font-bold text-gradient-green mb-8 text-center">
              Navigate Lessons
            </h3>
            
            <div className="space-y-3">
              {learningHowToLearnData.map((scene, index) => (
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
                      ? 'bg-gradient-to-r from-emerald-100 via-teal-100 to-cyan-100 dark:from-emerald-900 dark:via-teal-900 dark:to-cyan-900 border-2 border-emerald-500 dark:border-emerald-400 text-emerald-900 dark:text-emerald-100 scale-105'
                      : 'bg-gray-50 dark:bg-gray-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900 dark:hover:to-teal-900 border-2 border-transparent text-gray-900 dark:text-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold animate-float animate-pulse-glow ${
                      index === currentSceneIndex
                        ? 'bg-emerald-500 text-white'
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
              <h3 className="text-lg font-bold text-gradient-green mb-4 text-center">
                Progress
              </h3>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full transition-all duration-300 animate-gradient-x"
                    style={{ width: `${((currentSceneIndex + 1) / learningHowToLearnData.length) * 100}%` }}
                  />
                </div>
                <span className="text-base font-semibold text-gray-600 dark:text-gray-400">
                  {currentSceneIndex + 1}/{learningHowToLearnData.length}
                </span>
              </div>
              
              <p className="text-base text-gray-600 dark:text-gray-400 text-center">
                {Math.round(((currentSceneIndex + 1) / learningHowToLearnData.length) * 100)}% Complete
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningHowToLearn;