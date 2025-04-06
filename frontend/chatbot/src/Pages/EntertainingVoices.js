import React, { useState } from 'react';

function EntertainingVoices() {
  const [text, setText] = useState('');
  const [mode, setMode] = useState('comedian');

  const voiceStyleMap = {
    comedian: { pitch: 1.6, rate: 1.2 },
    wizard: { pitch: 0.8, rate: 0.9 },
    radio: { pitch: 1.2, rate: 1.5 },
  };

  const speakText = () => {
    if (!text) return alert("Please enter some text!");
    const utterance = new SpeechSynthesisUtterance(text);
    const { pitch, rate } = voiceStyleMap[mode];

    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.voice = speechSynthesis.getVoices().find(v => v.lang.startsWith('en')) || null;
    speechSynthesis.cancel(); // Stop previous speech
    speechSynthesis.speak(utterance);
  };

  const buttonStyle = {
    padding: '10px 18px',
    border: 'none',
    borderRadius: '6px',
    margin: '0 8px 12px 0',
    cursor: 'pointer',
    fontWeight: 'bold',
    background: '#444',
    color: '#fff'
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial', backgroundColor: '#fcfcfc', minHeight: '100vh' }}>
      <h2 style={{ marginBottom: '16px', textAlign: 'center' }}>🎭 Entertaining Audio Modes</h2>

      <textarea
        placeholder="Enter your fun story or topic..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="6"
        style={{ width: '100%', maxWidth: '800px', padding: '12px', fontSize: '16px', borderRadius: '8px', border: '1px solid #ccc', display: 'block', margin: '0 auto 24px auto' }}
      />

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {['comedian', 'wizard', 'radio'].map((type) => (
          <button
            key={type}
            onClick={() => setMode(type)}
            style={{
              ...buttonStyle,
              backgroundColor: mode === type ? '#ff6600' : '#444'
            }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button onClick={speakText} style={{ ...buttonStyle, backgroundColor: '#28a745', fontSize: '18px' }}>
          🔊 Play Voice
        </button>
      </div>
    </div>
  );
}

export default EntertainingVoices;
