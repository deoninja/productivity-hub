import React from 'react';
import BookPage from '../components/BookPage';
import { theDailyStoicData } from '../data/theDailyStoicData';

const TheDailyStoic = () => {
  const gradientColors = {
    light: 'text-gradient-stoic',
    dark: 'text-gradient-stoic',
    blob1: 'bg-gradient-to-br from-gray-600 via-gray-500 to-gray-400',
    blob2: 'bg-gradient-to-br from-gray-400 via-gray-300 to-gray-200',
    progress: 'bg-gradient-to-r from-gray-500 to-gray-600',
    badge: 'bg-gray-900',
    description: 'text-gray-400',
    playButton: 'bg-gray-600 hover:bg-gray-700',
    autoPlayButton: 'bg-gray-600 hover:bg-gray-700',
    tipButton: 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800',
    tipBox: 'border-gray-700 text-gray-300',
    sidebarActive: 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700',
    sidebarBorder: 'border-gray-500',
    sidebarActiveDot: 'bg-gray-500',
    sidebarDescription: 'text-gray-500',
  };

  return (
    <BookPage 
      bookData={theDailyStoicData}
      pageTitle="The Daily Stoic"
      pageSubtitle="365 Meditations on Wisdom, Perseverance, and the Art of Living"
      gradientColors={gradientColors}
    />
  );
};

export default TheDailyStoic;