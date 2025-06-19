import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Page Components
import HomePage from './pages/HomePage';
import SevenHabits from './pages/SevenHabits';
import FiveAMClub from './pages/FiveAMClub';
import LearningHowToLearn from './pages/LearningHowToLearn';
import AtomicHabits from './pages/AtomicHabits';

// Styles
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/seven-habits" element={<SevenHabits />} />
              <Route path="/five-am-club" element={<FiveAMClub />} />
              <Route path="/learning-how-to-learn" element={<LearningHowToLearn />} />
              <Route path="/atomic-habits" element={<AtomicHabits />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
