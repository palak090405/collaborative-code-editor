import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

function JoinRoomPage() {
  const [roomId, setRoomId] = useState('')
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  const handleJoin = (e) => {
    e.preventDefault()
    if (roomId && username) {
      navigate(`/room/${roomId}`, { state: { username } })
    }
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon">&lt;/&gt;</span>
            <span className="logo-text">CodeCollab</span>
          </div>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="#features">Features</a></li>
          </ul>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Join a Room</h1>
          <p className="hero-subtitle">
            Enter the Room ID and your username to join an existing collaboration session.
          </p>
          
          <form className="join-form" onSubmit={handleJoin}>
            <div className="form-group">
              <label htmlFor="roomId">Room ID</label>
              <input
                type="text"
                id="roomId"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                placeholder="Enter Room ID"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary">
              Join Room
            </button>
          </form>
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

export default JoinRoomPage
