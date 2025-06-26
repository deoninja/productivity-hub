import React from 'react';
import BookPage from '../components/BookPage';
import { atomicHabitsData } from '../data/atomicHabitsData';

const AtomicHabits = () => {
  const gradientColors = {
    light: 'text-gradient-atomic',
    dark: 'text-gradient-atomic',
    blob1: 'bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400',
    blob2: 'bg-gradient-to-br from-red-400 via-orange-300 to-yellow-200',
    progress: 'bg-gradient-to-r from-red-500 to-orange-600',
    badge: 'bg-red-900',
    description: 'text-orange-400',
    playButton: 'bg-red-600 hover:bg-red-700',
    autoPlayButton: 'bg-red-600 hover:bg-red-700',
    tipButton: 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700',
    tipBox: 'border-red-700 text-red-300',
    sidebarActive: 'bg-gradient-to-r from-red-900 via-orange-900 to-yellow-900',
    sidebarBorder: 'border-red-500',
    sidebarActiveDot: 'bg-red-500',
    sidebarDescription: 'text-orange-500',
  };

  return (
    <BookPage 
      bookData={atomicHabitsData}
      pageTitle="Atomic Habits"
      pageSubtitle="Master Your Habits, Master Your Life"
      gradientColors={gradientColors}
    />
  );
};

export default AtomicHabits;