import { useState, useRef, useEffect } from 'react';
import { PROGRESS_INTERVALS } from '../utils/constants';

/**
 * Custom hook for managing progress tracking
 */
export const useProgress = (isActive, textLength) => {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive && textLength) {
      const duration = textLength * PROGRESS_INTERVALS.TEXT_MULTIPLIER;
      const steps = duration / PROGRESS_INTERVALS.UPDATE_INTERVAL;
      const increment = 100 / steps;

      intervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(intervalRef.current);
            return 0;
          }
          return prev + increment;
        });
      }, PROGRESS_INTERVALS.UPDATE_INTERVAL);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    } else {
      setProgress(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [isActive, textLength]);

  const resetProgress = () => {
    setProgress(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return { progress, resetProgress };
};