import React from 'react';
export default function VoiceInput({ onResult }) {
  const start = () => {
    const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Speech) return alert('Voice input is not supported by this browser.');
    const recognition = new Speech();
    recognition.lang = 'en-IN';
    recognition.onresult = e => onResult(e.results[0][0].transcript);
    recognition.start();
  };
  return <button type="button" className="btn-secondary" onClick={start}>🎙 Voice Input</button>;
}
