import { useNavigate } from 'react-router-dom'
import '../App.css'

function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon">&lt;/&gt;</span>
            <span className="logo-text">CodeCollab</span>
          </div>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Code Together, Build Faster</h1>
          <p className="hero-subtitle">
            Experience real-time collaboration with your team. Write, edit, and debug code together in a shared workspace, no matter where you are.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => navigate('/create-room')}>
              Create Room
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/join-room')}>
              Join Room
            </button>
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <h2 className="section-title">Powerful Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Real-Time Collaboration</h3>
            <p>Code together with your team in real-time. See changes instantly as they happen.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h3>Multi-Language Support</h3>
            <p>Support for JavaScript, Python, TypeScript, Go, and many more languages.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Live Chat</h3>
            <p>Communicate with your team directly in the editor. Discuss code without leaving your workspace.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">▶️</div>
            <h3>Code Execution</h3>
            <p>Run your code directly in the browser with instant feedback and results.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-icon">&lt;/&gt;</span>
            <span className="logo-text">CodeCollab</span>
          </div>
          <p className="footer-text">© 2026 CodeCollab. Built for developers, by developers.</p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
