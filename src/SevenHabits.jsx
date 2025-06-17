import React, { useState, useEffect, useRef } from 'react';
import { habitsData } from './data';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
              The 7 Habits of Highly Effective People
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Interactive Summary by Stephen R. Covey
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
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-100"
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
                      <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
                        {currentScene + 1} of {habitsData.length}
                      </span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                      {currentHabit.title}
                    </h2>
                    
                    <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold mb-6">
                      {currentHabit.description}
                    </p>
                    
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {currentHabit.text}
                      </p>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="flex-shrink-0 md:w-80">
                    <div className="relative overflow-hidden rounded-xl shadow-lg">
                      <img 
                        src={currentHabit.image} 
                        alt={currentHabit.altText}
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
                    disabled={currentScene === 0}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <FontAwesomeIcon icon={faStepBackward} />
                    Previous
                  </button>

                  <button
                    onClick={togglePlay}
                    disabled={autoPlay}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
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
                    <FontAwesomeIcon icon={autoPlay ? faPause : faVolumeUp} />
                    {autoPlay ? 'Stop Auto' : 'Auto Play'}
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={currentScene === habitsData.length - 1}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    <FontAwesomeIcon icon={faRedo} />
                    Restart
                  </button>
                </div>

                {/* 7 Habits Tip Generation */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                  <button
                    onClick={generateTip}
                    disabled={isLoadingTip}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
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

          {/* Sidebar - Habit Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
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
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                      index === currentScene
                        ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 dark:border-blue-400'
                        : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === currentScene
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold truncate ${
                          index === currentScene
                            ? 'text-blue-900 dark:text-blue-100'
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {habit.title}
                        </p>
                        <p className={`text-sm truncate ${
                          index === currentScene
                            ? 'text-blue-700 dark:text-blue-300'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {habit.description}
                        </p>
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
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${((currentScene + 1) / habitsData.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  {currentScene + 1}/{habitsData.length}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400">
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