import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function ExplanationForm() {
  const [topic, setTopic] = useState('');
  const [responses, setResponses] = useState({ kids: '', teen: '', expert: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/explain', {
        prompt: topic,
      });
      setResponses(res.data);
    } catch (err) {
      console.error(err);
      alert("API call failed");
    }
  };

  const containerStyle = {
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#0B1D3A',
    color: '#FFFFFF',
    minHeight: '100vh',
    padding: '40px 20px',
  };

  const formStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center',
  };

  const inputStyle = {
    padding: '12px',
    width: '100%',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    marginBottom: '16px',
    color: '#000',
  };

  const buttonStyle = {
    padding: '12px 30px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#1E90FF',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '6px',
    transition: 'background 0.3s',
  };

  const cardStyle = {
    flex: '1',
    minWidth: '280px',
    padding: '24px',
    backgroundColor: '#112B50',
    borderRadius: '12px',
    color: '#FFFFFF',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  };

  const containerFlex = {
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    flexWrap: 'wrap',
    marginTop: '40px',
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 600 }}>
        Concept Explainer Bot
      </h2>

      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Ask me anything (e.g., Blockchain, AI)..."
          style={inputStyle}
        />
        <br />
        <button type="submit" style={buttonStyle}>
          Explain
        </button>
      </form>

      {responses.kids && (
        <div style={containerFlex}>
          <motion.div
            style={cardStyle}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <h3>🧸 For Kids</h3>
            <p>{responses.kids}</p>
          </motion.div>

          <motion.div
            style={cardStyle}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{ delay: 0.2 }}
          >
            <h3>🎓 For Teens</h3>
            <p>{responses.teen}</p>
          </motion.div>

          <motion.div
            style={cardStyle}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{ delay: 0.4 }}
          >
            <h3>🧠 For Experts</h3>
            <p>{responses.expert}</p>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default ExplanationForm;


