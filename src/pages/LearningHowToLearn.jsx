import React from 'react';
import BookPage from '../components/BookPage';
import { learningHowToLearnData } from '../data/learningHowToLearnData';

const LearningHowToLearn = () => {
  const gradientColors = {
    light: 'text-gradient-lhtl',
    dark: 'text-gradient-lhtl',
    blob1: 'bg-gradient-to-br from-purple-600 via-pink-500 to-red-400',
    blob2: 'bg-gradient-to-br from-purple-400 via-pink-300 to-red-200',
    progress: 'bg-gradient-to-r from-purple-500 to-pink-600',
    badge: 'bg-purple-900',
    description: 'text-pink-400',
    playButton: 'bg-purple-600 hover:bg-purple-700',
    autoPlayButton: 'bg-purple-600 hover:bg-purple-700',
    tipButton: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
    tipBox: 'border-purple-700 text-purple-300',
    sidebarActive: 'bg-gradient-to-r from-purple-900 via-pink-900 to-red-900',
    sidebarBorder: 'border-purple-500',
    sidebarActiveDot: 'bg-purple-500',
    sidebarDescription: 'text-pink-500',
  };

  return (
    <BookPage 
      bookData={learningHowToLearnData}
      pageTitle="Learning How to Learn"
      pageSubtitle="Unlock Your Brain’s Potential"
      gradientColors={gradientColors}
    />
  );
};

export default LearningHowToLearn;
