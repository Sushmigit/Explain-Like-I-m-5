import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AudioCompanionPage from './Pages/AudioCompanion';
import ExplanationForm from './Pages/Home';
import DyslexiaPage from './Pages/DyslexiaPage';
import EntertainingVoices from './Pages/EntertainingVoices';

function App() {
  return (
    <Router>
      <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Header */}
        <header style={{ backgroundColor: '#282c34', padding: '20px', color: 'white', textAlign: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '2rem' }}>🎓 EduVibe: Learn, Hear & Explore</h1>
        </header>

        {/* Navbar */}
        <nav style={{
          backgroundColor: '#444',
          padding: '10px 20px',
          display: 'flex',
          justifyContent: 'center',
          gap: '25px',
          fontWeight: 'bold'
        }}>
          <Link to="/" style={navLinkStyle}>🔍 Explainer</Link>
          <Link to="/dyslexia" style={navLinkStyle}>🧠 Dyslexia</Link>
          <Link to="/audio" style={navLinkStyle}>🔊 Audio Companion</Link>
          <Link to="/entertainment" style={navLinkStyle}>🎤 Fun Voices</Link>
        </nav>

        {/* Main content */}
        <main style={{ flex: 1, padding: '40px 20px' }}>
          <Routes>
            <Route path="/" element={<ExplanationForm />} />
            <Route path="/dyslexia" element={<DyslexiaPage />} />
            <Route path="/audio" element={<AudioCompanionPage />} />
            <Route path="/entertainment" element={<EntertainingVoices />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer style={{
          backgroundColor: '#282c34',
          color: 'white',
          padding: '12px',
          textAlign: 'center',
          fontSize: '0.9rem'
        }}>
          © 2025 EduVibe.
        </footer>
      </div>
    </Router>
  );
}

// Style for navbar links
const navLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '1rem',
  padding: '6px 12px',
  borderRadius: '6px',
  transition: '0.3s',
};

export default App;
