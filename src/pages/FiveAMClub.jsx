import React from 'react';
import BookPage from '../components/BookPage';
import { fiveAMClubData } from '../data/fiveAMClubData';

const FiveAMClub = () => {
  const gradientColors = {
    light: 'text-gradient-5am',
    dark: 'text-gradient-5am',
    blob1: 'bg-gradient-to-br from-blue-600 via-teal-500 to-green-400',
    blob2: 'bg-gradient-to-br from-blue-400 via-teal-300 to-green-200',
    progress: 'bg-gradient-to-r from-blue-500 to-teal-600',
    badge: 'bg-blue-900',
    description: 'text-teal-400',
    playButton: 'bg-blue-600 hover:bg-blue-700',
    autoPlayButton: 'bg-blue-600 hover:bg-blue-700',
    tipButton: 'bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700',
    tipBox: 'border-blue-700 text-blue-300',
    sidebarActive: 'bg-gradient-to-r from-blue-900 via-teal-900 to-green-900',
    sidebarBorder: 'border-blue-500',
    sidebarActiveDot: 'bg-blue-500',
    sidebarDescription: 'text-teal-500',
  };

  return (
    <BookPage 
      bookData={fiveAMClubData}
      pageTitle="The 5 AM Club"
      pageSubtitle="Own Your Morning, Elevate Your Life"
      gradientColors={gradientColors}
    />
  );
};

export default FiveAMClub;