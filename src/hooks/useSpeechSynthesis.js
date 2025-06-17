import { useState, useRef, useCallback } from 'react';
import { speakText, cancelSpeech } from '../utils/speechSynthesis';

/**
 * Custom hook for managing speech synthesis
 */
export const useSpeechSynthesis = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const utteranceRef = useRef(null);

  const speak = useCallback((text, options = {}) => {
    const defaultOptions = {
      onStart: () => {
        setIsPlaying(true);
        setIsPaused(false);
      },
      onEnd: () => {
        setIsPlaying(false);
        setIsPaused(false);
        if (options.onEnd) options.onEnd();
      },
      onError: () => {
        setIsPlaying(false);
        setIsPaused(false);
        if (options.onError) options.onError();
      },
      ...options
    };

    utteranceRef.current = speakText(text, defaultOptions);
  }, []);

  const stop = useCallback(() => {
    cancelSpeech();
    setIsPlaying(false);
    setIsPaused(false);
  }, []);

  const pause = useCallback(() => {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
      speechSynthesis.pause();
      setIsPaused(true);
    }
  }, []);

  const resume = useCallback(() => {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
      setIsPaused(false);
    }
  }, []);

  return {
    isPlaying,
    isPaused,
    speak,
    stop,
    pause,
    resume
  };
};