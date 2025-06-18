
import { useState, useEffect } from 'react';

export const useTextToSpeech = () => {
  const [isEnabled, setIsEnabled] = useState(() => {
    const saved = localStorage.getItem('mahoro-tts-enabled');
    return saved ? JSON.parse(saved) : false;
  });
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    localStorage.setItem('mahoro-tts-enabled', JSON.stringify(isEnabled));
  }, [isEnabled]);

  const speak = (text: string, language: string = 'en') => {
    if (!isEnabled || !text) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language based on selection
    const langMap: { [key: string]: string } = {
      'en': 'en-US',
      'fr': 'fr-FR',
      'sw': 'sw-KE',
      'rw': 'rw-RW' // May not be available on all browsers
    };
    
    utterance.lang = langMap[language] || 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const toggle = () => {
    setIsEnabled(!isEnabled);
    if (!isEnabled) {
      stop(); // Stop speaking if disabling
    }
  };

  return {
    isEnabled,
    isSpeaking,
    speak,
    stop,
    toggle
  };
};
