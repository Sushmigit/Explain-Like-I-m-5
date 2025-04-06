import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function DyslexiaPage() {
  const [topic, setTopic] = useState('');
  const [response, setResponse] = useState('');
  const [view, setView] = useState('simple');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/explain-dyslexia', {
        prompt: topic,
        format: view
      });
      setResponse(res.data.response);
    } catch (err) {
      console.error(err);
      alert("API call failed");
    }
  };

  const renderFormattedResponse = () => {
    if (!response) return null;

    // For QA format
    if (view === 'qa') {
      const lines = response.split('\n').filter(line => line.trim() !== '');
      return lines.map((line, idx) => {
        if (line.startsWith('Q:')) {
          return <p key={idx}><strong>{line}</strong></p>;
        } else if (line.startsWith('A:')) {
          return <p key={idx} style={{ marginLeft: '20px' }}>{line}</p>;
        } else {
          return <p key={idx}>{line}</p>;
        }
      });
    }

    // For steps format
    if (view === 'steps') {
      const steps = response.split('\n').filter(line => line.trim().match(/^\d+\. /));
      return (
        <ol style={{ paddingLeft: '20px' }}>
          {steps.map((step, idx) => (
            <li key={idx} style={{ marginBottom: '8px' }}>{step.replace(/^\d+\.\s*/, '')}</li>
          ))}
        </ol>
      );
    }

    // Default for simple or story
    return response.split('\n').map((para, idx) => (
      <p key={idx} style={{ marginBottom: '12px' }}>{para}</p>
    ));
  };

  const buttonStyle = {
    padding: '8px 16px',
    background: '#1E90FF',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    margin: '0 6px',
    cursor: 'pointer'
  };

  return (
    <div style={{
      fontFamily: 'OpenDyslexic, Arial',
      backgroundColor: '#fefefe',
      padding: '40px',
      color: '#222',
      minHeight: '100vh'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Dyslexia-Friendly Explainer</h2>

      <form onSubmit={handleSubmit} style={{ textAlign: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic or paragraph..."
          style={{
            padding: '12px',
            width: '60%',
            fontSize: '16px',
            borderRadius: '6px',
            border: '1px solid #ccc'
          }}
        />
        <br /><br />
        <div>
          <span>Select View: </span>
          {['simple', 'steps', 'qa', 'story'].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setView(mode)}
              style={{ ...buttonStyle, backgroundColor: view === mode ? '#005bbb' : '#1E90FF' }}
            >
              {mode.toUpperCase()}
            </button>
          ))}
        </div>
        <br />
        <button type="submit" style={{ ...buttonStyle, fontSize: '16px' }}>Explain</button>
      </form>

      {response && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '24px',
            background: '#f3faff',
            borderRadius: '12px',
            lineHeight: '1.6'
          }}
        >
          {renderFormattedResponse()}
        </motion.div>
      )}
    </div>
  );
}

export default DyslexiaPage;
