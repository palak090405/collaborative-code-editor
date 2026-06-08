const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const registerSocketHandlers = require('./socket/handlers');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://collaborative-code-editor-opal.vercel.app'
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

// Create HTTP server
const httpServer = createServer(app);

// Initialize Socket.IO with CORS configuration
const io = new Server(httpServer, {
  cors: {
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://collaborative-code-editor-opal.vercel.app'
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Register socket event handlers
registerSocketHandlers(io);

// Health check
app.get('/', (req, res) => {
  res.json({
    message: 'CodeCollab Socket.IO Server is running',
  });
});

// Start server
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});