# CodeCollab 🚀

A real-time collaborative code editor built using React, Node.js, Express, Socket.IO, and Monaco Editor.

## Features

- Real-time code synchronization
- Create and join collaboration rooms
- Multi-user collaboration
- User presence tracking
- Live language synchronization
- Copy Room ID feature
- Dark/Light theme toggle
- Toast notifications
- Monaco code editor integration

## Tech Stack

### Frontend
- React
- Vite
- Monaco Editor
- React Hot Toast
- Socket.IO Client

### Backend
- Node.js
- Express.js
- Socket.IO

## Project Structure

```text
collaborative-code-editor
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── socket
│   ├── utils
│   └── server.js
│
└── README.md
```

## Installation

### Clone Repository

```bash
git clone https://github.com/palak090405/collaborative-code-editor.git
```

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run dev
```

## How It Works

1. Create a collaboration room.
2. Share the Room ID with other users.
3. Users join the same room.
4. Code changes are synchronized in real time using Socket.IO.
5. All connected users can collaborate simultaneously.

## Future Improvements

- Authentication system
- Chat functionality
- Code execution support
- Database integration
- Deployment to cloud platforms

## Author

Palak Maurya
