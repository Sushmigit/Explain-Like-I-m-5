import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const topic = location.state?.prompt;
  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    if (!topic) {
      navigate('/');
      return;
    }

    axios
      .post('http://localhost:5000/quiz', { prompt: topic })
      .then((res) => setQuiz(res.data.quiz))
      .catch((err) => console.error(err));
  }, [topic, navigate]);

  return (
    <div style={{ background: '#0B1D3A', color: 'white', minHeight: '100vh', padding: 30 }}>
      <h2>Quiz on "{topic}"</h2>
      {quiz.map((q, index) => (
        <div key={index} style={questionCardStyle}>
          <h4>{index + 1}. {q.question}</h4>
          <ul>
            {q.options.map((opt, i) => (
              <li key={i}>{opt}</li>
            ))}
          </ul>
          <p style={{ color: '#00FFAB' }}><strong>Answer:</strong> {q.answer}</p>
        </div>
      ))}
    </div>
  );
}

const questionCardStyle = {
  backgroundColor: '#112B50',
  padding: '20px',
  margin: '20px 0',
  borderRadius: '10px',
};

export default QuizPage;
