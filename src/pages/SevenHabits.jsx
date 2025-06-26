import React from 'react';
import BookPage from '../components/BookPage';
import { sevenHabitsData } from '../data/sevenHabitsData';

const SevenHabits = () => {
  const gradientColors = {
    light: 'text-gradient-7h',
    dark: 'text-gradient-7h',
    blob1: 'bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-400',
    blob2: 'bg-gradient-to-br from-teal-400 via-emerald-300 to-blue-200',
    progress: 'bg-gradient-to-r from-blue-500 to-purple-600',
    badge: 'bg-blue-900',
    description: 'text-indigo-400',
    playButton: 'bg-blue-600 hover:bg-blue-700',
    autoPlayButton: 'bg-blue-600 hover:bg-blue-700',
    tipButton: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
    tipBox: 'border-blue-700 text-blue-300',
    sidebarActive: 'bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900',
    sidebarBorder: 'border-blue-500',
    sidebarActiveDot: 'bg-blue-500',
    sidebarDescription: 'text-indigo-500',
  };

  return (
    <BookPage 
      bookData={sevenHabitsData}
      pageTitle="The 7 Habits of Highly Effective People"
      pageSubtitle="Interactive Summary by Stephen R. Covey"
      gradientColors={gradientColors}
    />
  );
};

export default SevenHabits;