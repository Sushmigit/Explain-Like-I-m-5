import React, { useState } from 'react';
import { motion } from 'framer-motion';

function AudioCompanion() {
  const [text, setText] = useState('');
  const [mode, setMode] = useState('kids');

  const synth = window.speechSynthesis;

  const handleSpeak = () => {
    if (!text.trim()) {
      alert("Please enter some text!");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    switch (mode) {
      case 'kids':
        utterance.rate = 0.6;
        utterance.pitch = 1.4;
        break;
      case 'teens':
        utterance.rate = 1.0;
        utterance.pitch = 1.1;
        break;
      case 'experts':
        utterance.rate = 1.3;
        utterance.pitch = 1.0;
        break;
      default:
        break;
    }

    synth.speak(utterance);
  };

  const buttonStyle = {
    padding: '8px 16px',
    background: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    margin: '0 6px',
    cursor: 'pointer'
  };

  return (
    <div style={{
      fontFamily: 'Arial',
      backgroundColor: '#f9f9f9',
      padding: '40px',
      color: '#222',
      minHeight: '100vh'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Audio Companion (Text-to-Speech)</h2>

      <form onSubmit={(e) => e.preventDefault()} style={{ textAlign: 'center', marginBottom: '20px' }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text to read aloud..."
          rows="6"
          style={{
            padding: '12px',
            width: '60%',
            fontSize: '16px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            resize: 'vertical'
          }}
        />
        <br /><br />
        <div>
          <span>Select Tone: </span>
          {['kids', 'teens', 'experts'].map((tone) => (
            <button
              key={tone}
              type="button"
              onClick={() => setMode(tone)}
              style={{ ...buttonStyle, backgroundColor: mode === tone ? '#2E8B57' : '#4CAF50' }}
            >
              {tone.toUpperCase()}
            </button>
          ))}
        </div>
        <br />
        <button
          type="button"
          onClick={handleSpeak}
          style={{ ...buttonStyle, fontSize: '16px', backgroundColor: '#1E90FF' }}
        >
          Speak
        </button>
      </form>

      {text && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '24px',
            background: '#fffaf0',
            borderRadius: '12px',
            lineHeight: '1.6',
            fontStyle: 'italic'
          }}
        >
          <p>{text}</p>
        </motion.div>
      )}
    </div>
  );
}

export default AudioCompanion;
