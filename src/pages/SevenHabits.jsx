import React, { useState, useEffect, useRef } from 'react';
import { habitsData } from '../data/habitsData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepBackward, faStepForward, faRedo, faVolumeUp, faLightbulb, faSpinner } from '@fortawesome/free-solid-svg-icons';

function SevenHabits() {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedTip, setGeneratedTip] = useState('');
  const [isLoadingTip, setIsLoadingTip] = useState(false);
  const progressInterval = useRef(null);

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onend = () => {
      setIsPlaying(false);
      if (autoPlay) {
        handleNext();
      }
    };
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const handleNext = () => {
    if (currentScene < habitsData.length - 1) {
      setCurrentScene(currentScene + 1);
    } else {
      setCurrentScene(0);
    }
  };

  const handlePrev = () => {
    if (currentScene > 0) {
      setCurrentScene(currentScene - 1);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setAutoPlay(false);
    } else {
      speakText(`${habitsData[currentScene].title}. ${habitsData[currentScene].text}`);
    }
  };

  const toggleAutoPlay = () => {
    if (autoPlay) {
      setAutoPlay(false);
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      setAutoPlay(true);
    }
  };

  // Auto-play effect
  useEffect(() => {
    if (autoPlay) {
      speakText(`${habitsData[currentScene].title}. ${habitsData[currentScene].text}`);
    }
  }, [currentScene, autoPlay]);

  // Progress bar effect
  useEffect(() => {
    if (isPlaying && autoPlay) {
      const duration = habitsData[currentScene].text.length * 50;
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
  }, [currentScene, isPlaying, autoPlay]);

  // Generate tip function with contextual 7 Habits tips
  const generateTip = async () => {
    setIsLoadingTip(true);
    setGeneratedTip('');

    const currentHabit = habitsData[currentScene];
    
    // Comprehensive collection of 7 Habits tips organized by habit
    const tipsByHabit = {
      0: [ // Intro: The Mirage of Success
        "Start your effectiveness journey by identifying one 'quick fix' you've been relying on. Replace it this week with a principle-based approach that builds long-term character.",
        "Create a 'Character vs. Personality' journal. Each evening, reflect on whether your actions today came from deep principles or surface-level techniques.",
        "Read biographies of people you admire. Notice how their effectiveness came from consistent principles, not shortcuts or tricks.",
        "Practice the 'Inside-Out' approach: Before trying to change your circumstances, spend 10 minutes each morning working on changing yourself first."
      ],
      1: [ // Habit 1: Be Proactive
        "Create a 'Circle of Influence' diagram. List your current concerns, then identify which ones you can actually control. Focus 80% of your energy there.",
        "Practice the 'Pause and Choose' technique: When something frustrating happens, take 3 deep breaths and ask 'How do I choose to respond?' before reacting.",
        "Replace reactive language with proactive language. Instead of 'I have to,' say 'I choose to.' Instead of 'If only,' say 'I prefer.'",
        "Start each day by writing down 3 proactive actions you can take, regardless of what others do or what circumstances arise."
      ],
      2: [ // Habit 2: Begin with the End in Mind
        "Write your personal mission statement in 25 words or less. Post it where you'll see it daily and use it to guide major decisions.",
        "Practice 'funeral thinking': Imagine your funeral and what you'd want people to say about you. Let this vision guide your daily choices.",
        "Create a 'Life Roles' chart listing your key roles (parent, professional, friend, etc.). Set one goal for each role this month.",
        "Use the 'Deathbed Test': Before making important decisions, ask 'Will this matter when I'm on my deathbed?' This clarifies true priorities."
      ],
      3: [ // Habit 3: Put First Things First
        "Use the Eisenhower Matrix daily: Categorize tasks as Urgent/Important, Important/Not Urgent, Urgent/Not Important, or Neither. Focus on Quadrant II.",
        "Practice saying 'No' to good opportunities so you can say 'Yes' to great ones. Write down what you'll stop doing to make room for what matters most.",
        "Schedule your priorities instead of prioritizing your schedule. Block time for important but not urgent activities first.",
        "Implement 'Weekly Planning': Every Sunday, review your roles and set 2-3 key goals for each role for the coming week."
      ],
      4: [ // Habit 4: Think Win/Win
        "Before your next negotiation or conflict, write down what a Win/Win outcome would look like for all parties involved.",
        "Practice 'Abundance Thinking': When you feel competitive or jealous, remind yourself that there's enough success for everyone.",
        "Create a 'Win/Win Agreement' template for recurring situations (family chores, work projects). Include desired results, guidelines, resources, and consequences.",
        "Use the 'Golden Eggs' principle: Focus on maintaining relationships (the goose) while achieving results (golden eggs). Never sacrifice one for the other."
      ],
      5: [ // Habit 5: Seek First to Understand
        "Practice 'Empathic Listening' for one conversation daily: Listen with the intent to understand, not to reply. Reflect back what you heard before responding.",
        "Use the 'Listening Levels' check: Am I ignoring, pretending to listen, selective listening, attentive listening, or empathic listening?",
        "Before giving advice, ask 'Do you want me to listen or help you solve this?' This shows respect for the other person's autonomy.",
        "Practice the 'Seek First' rule: In disagreements, spend twice as much time understanding their position as explaining yours."
      ],
      6: [ // Habit 6: Synergize
        "Actively seek out people who disagree with you on important topics. Practice finding the third alternative that's better than either original idea.",
        "Use the 'Synergy Question': In team meetings, ask 'How can we create something together that's better than what any of us could create alone?'",
        "Practice 'Valuing Differences': When someone annoys you, ask 'What strength might they have that I lack?' Look for the gift in their difference.",
        "Create 'Synergy Sessions': Set aside time with colleagues or family to brainstorm solutions where everyone's ideas build on each other."
      ],
      7: [ // Habit 7: Sharpen the Saw
        "Design a weekly 'Sharpening Schedule': Physical (exercise), Mental (reading), Spiritual (meditation/prayer), Social (meaningful relationships).",
        "Practice the 'Daily Renewal' routine: 10 minutes physical activity, 10 minutes reading, 10 minutes reflection/meditation each day.",
        "Implement 'Learning Fridays': Dedicate Friday afternoons to learning something new that will improve your effectiveness.",
        "Create a 'Personal Board of Directors': Identify mentors for each dimension (physical, mental, spiritual, social) and meet with them regularly."
      ],
      8: [ // Conclusion: A Principle-Centered Life
        "Conduct a monthly 'Principle Audit': Review your decisions and actions. Which were based on principles vs. emotions or external pressures?",
        "Create a 'Principle-Based Decision Framework': List your core principles and use them as filters for all major life decisions.",
        "Practice 'Interdependent Thinking': Before making decisions, consider how they affect your relationships and community, not just yourself.",
        "Start a 'Effectiveness Journal': Track your progress on all 7 habits weekly. Celebrate growth and identify areas for improvement."
      ]
    };

    // General 7 Habits tips that apply to any habit
    const generalTips = [
      "Practice the 'Private Victory before Public Victory' principle: Work on Habits 1-3 (self-mastery) before focusing on Habits 4-6 (relationship mastery).",
      "Use the '7 Habits Weekly Review': Every Sunday, rate yourself 1-10 on each habit and choose one specific improvement for the coming week.",
      "Create 'Habit Triggers': Link each habit to a specific time or situation. For example, practice empathic listening every time someone seems upset.",
      "Apply the 'Maturity Continuum': Notice when you're being dependent (victim), independent (self-reliant), or interdependent (collaborative).",
      "Practice 'Principle-Centered Leadership': Before making decisions, ask 'What would someone guided by principles do in this situation?'",
      "Use the 'Character Ethic vs. Personality Ethic' filter: Focus on being trustworthy rather than using techniques to appear trustworthy.",
      "Implement 'Paradigm Shifts': When facing challenges, ask 'What if my current way of seeing this situation is wrong? What other perspectives exist?'",
      "Practice 'Emotional Bank Account' deposits: Do small acts of kindness, keep commitments, and show loyalty to build trust in relationships.",
      "Use 'Stewardship Delegation': When assigning tasks, focus on desired results and guidelines rather than methods and procedures.",
      "Apply the 'Abundance Mentality': Believe there's enough success, recognition, and happiness for everyone. Celebrate others' victories as your own."
    ];

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Get habit-specific tips or fall back to general tips
      const habitTips = tipsByHabit[currentScene] || generalTips;
      const allAvailableTips = [...habitTips, ...generalTips];
      
      // Select a random tip
      const randomTip = allAvailableTips[Math.floor(Math.random() * allAvailableTips.length)];
      
      setGeneratedTip(randomTip);
    } catch (error) {
      setGeneratedTip("Failed to generate tip. Remember: True effectiveness comes from character, not techniques. Focus on being trustworthy, and trust will follow.");
    } finally {
      setIsLoadingTip(false);
    }
  };

  const currentHabit = habitsData[currentScene];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-x-hidden noise-texture">
      {/* Animated Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 opacity-30 blur-3xl rounded-full animate-morph z-0 pointer-events-none" style={{ filter: 'blur(80px)', top: '-8rem', left: '-8rem' }}></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-400 via-emerald-400 to-blue-400 opacity-20 blur-3xl rounded-full animate-morph z-0 pointer-events-none" style={{ filter: 'blur(80px)', bottom: '-8rem', right: '-8rem' }}></div>
      
      {/* Header */}
      <div className="glass dark:glass-dark shadow-lg border-b border-white/20 dark:border-white/10 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center">
            <h1 className="text-responsive-4xl md:text-responsive-5xl font-extrabold text-gradient-blue mb-2 animate-fade-in-scale">
              The 7 Habits of Highly Effective People
            </h1>
            <p className="text-responsive-lg text-gray-700 dark:text-gray-300 animate-slide-in-up">
              Interactive Summary by Stephen R. Covey
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
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient-x transition-all duration-100 rounded-full"
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
                      <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-base font-semibold rounded-full animate-float animate-pulse-glow">
                        Habit {currentScene + 1} of {habitsData.length}
                      </span>
                    </div>
                    
                    <h2 className="text-responsive-2xl md:text-responsive-3xl font-bold text-gradient-blue mb-4 leading-tight animate-slide-in-down">
                      {currentHabit.title}
                    </h2>
                    
                    <p className="text-responsive-lg text-blue-600 dark:text-blue-400 font-semibold mb-6 animate-fade-in-scale">
                      {currentHabit.description}
                    </p>
                    
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                        {currentHabit.text}
                      </p>
                    </div>

                    {/* Large Visual Emoji */}
                    <div className="mt-8 text-center">
                      <span className="text-8xl md:text-9xl animate-pulse animate-float">
                        {currentHabit.visual}
                      </span>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="flex-shrink-0 md:w-96">
                    <div className="relative overflow-hidden rounded-2xl shadow-xl animate-float">
                      <img 
                        src={currentHabit.image} 
                        alt={currentHabit.altText}
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
                    disabled={currentScene === 0}
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
                    disabled={currentScene === habitsData.length - 1}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold btn-hover-lift shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Next
                    <FontAwesomeIcon icon={faStepForward} />
                  </button>

                  <button
                    onClick={() => {
                      setCurrentScene(0);
                      setIsPlaying(false);
                      setAutoPlay(false);
                      window.speechSynthesis.cancel();
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-lg btn-hover-lift shadow-md transition-all"
                  >
                    <FontAwesomeIcon icon={faRedo} />
                    Restart
                  </button>
                </div>

                {/* 7 Habits Tip Generation */}
                <div className="mt-8 pt-8 border-t border-white/10 dark:border-white/10">
                  <button
                    onClick={generateTip}
                    disabled={isLoadingTip}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold text-lg btn-hover-lift shadow-lg animate-pulse-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isLoadingTip ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                        Generating Tip...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faLightbulb} />
                        Get 7 Habits Tip
                      </>
                    )}
                  </button>

                  {generatedTip && (
                    <div className="mt-6 p-6 glass dark:glass-dark border border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-300 rounded-xl shadow-lg animate-fade-in-scale">
                      <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-gradient-blue">
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

          {/* Sidebar - Habit Navigation */}
          <div className="glass dark:glass-dark rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 p-8 animate-fade-in-scale">
            <h3 className="text-responsive-xl font-bold text-gradient-blue mb-8 text-center">
              Navigate Habits
            </h3>
            
            <div className="space-y-3">
              {habitsData.map((habit, index) => (
                <button
                  key={habit.id}
                  onClick={() => {
                    setCurrentScene(index);
                    setIsPlaying(false);
                    setAutoPlay(false);
                    window.speechSynthesis.cancel();
                  }}
                  className={`w-full text-left p-5 rounded-xl font-semibold transition-all duration-200 card-hover btn-hover-lift shadow-md ${
                    index === currentScene
                      ? 'bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 border-2 border-blue-500 dark:border-blue-400 text-blue-900 dark:text-blue-100 scale-105'
                      : 'bg-gray-50 dark:bg-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900 dark:hover:to-indigo-900 border-2 border-transparent text-gray-900 dark:text-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold animate-float animate-pulse-glow ${
                      index === currentScene
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold truncate text-responsive-base">
                        {habit.title}
                      </p>
                      <p className="text-sm truncate text-gray-600 dark:text-gray-400">
                        {habit.description}
                      </p>
                    </div>
                    <div className="text-3xl animate-float">
                      {habit.visual}
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
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300 animate-gradient-x"
                    style={{ width: `${((currentScene + 1) / habitsData.length) * 100}%` }}
                  />
                </div>
                <span className="text-base font-semibold text-gray-600 dark:text-gray-400">
                  {currentScene + 1}/{habitsData.length}
                </span>
              </div>
              
              <p className="text-base text-gray-600 dark:text-gray-400 text-center">
                {Math.round(((currentScene + 1) / habitsData.length) * 100)}% Complete
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
  
  );
}

export default SevenHabits;
