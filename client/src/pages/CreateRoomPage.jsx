import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { io } from "socket.io-client";
import '../App.css'
const socket = io("http://localhost:5000");

function CreateRoomPage() {
  const [roomId, setRoomId] = useState('')
  const navigate = useNavigate()

  const generateRoomId = () => {
    const id = Math.random().toString(36).substring(2, 8).toUpperCase()
    setRoomId(id)
  }

 const handleStartCollaboration = () => {
  const username = "Host";

  socket.emit("create-room", {
    roomId,
    username,
  });

  navigate(`/room/${roomId}`);
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
          <h1 className="hero-title">Create a Room</h1>
          <p className="hero-subtitle">
            Generate a unique room ID and share it with your team to start collaborating in real-time.
          </p>
          
          <div className="room-id-container">
            <button className="btn btn-secondary" onClick={generateRoomId}>
              Generate Room ID
            </button>
            
            {roomId && (
              <div className="room-id-display">
                <p className="room-id-label">Your Room ID:</p>
                <div className="room-id-value">{roomId}</div>
                <button className="btn btn-primary" onClick={handleStartCollaboration}>
                  Start Collaboration
                </button>
              </div>
            )}
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

export default CreateRoomPage
