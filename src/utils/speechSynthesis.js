/**
 * Speech synthesis utility functions
 */

export const speakText = (text, options = {}) => {
  const {
    rate = 0.9,
    pitch = 1,
    volume = 1,
    onEnd = null,
    onStart = null,
    onError = null
  } = options;

  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;
  utterance.pitch = pitch;
  utterance.volume = volume;

  if (onEnd) utterance.onend = onEnd;
  if (onStart) utterance.onstart = onStart;
  if (onError) utterance.onerror = onError;

  speechSynthesis.speak(utterance);
  return utterance;
};

export const cancelSpeech = () => {
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }
};

export const pauseSpeech = () => {
  if (speechSynthesis.speaking) {
    speechSynthesis.pause();
  }
};

export const resumeSpeech = () => {
  if (speechSynthesis.paused) {
    speechSynthesis.resume();
  }
};

export const isSpeechSupported = () => {
  return 'speechSynthesis' in window;
};