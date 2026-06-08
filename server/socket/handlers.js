const roomManager = require('../utils/roomManager');

/**
 * Register socket event handlers
 * @param {object} io - Socket.IO server instance
 */
function registerSocketHandlers(io) {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Create Room
    socket.on('create-room', ({ roomId, username }) => {
      console.log(`Create room request: ${roomId} by ${username}`);

      const room = roomManager.createRoom(
        roomId,
        username,
        socket.id
      );

      socket.join(roomId);
console.log("=================================");
console.log("Room members:");
console.log(io.sockets.adapter.rooms.get(roomId));
console.log("Joined socket room:", roomId);
console.log("Socket ID:", socket.id);
console.log("Current users:", room.users.length);
console.log("=================================");
      socket.emit('room-created', {
        roomId: room.roomId,
        users: room.users,
        code: room.code,
        language: room.language,
      });

      console.log(`Room created: ${roomId}`);
    });

    // Join Room
    socket.on('join-room', ({ roomId, username }) => {
    
      console.log(`Join room request: ${roomId} by ${username}`);

      const room = roomManager.joinRoom(
        roomId,
        username,
        socket.id
      );

      if (!room) {
        socket.emit('error', {
          message: 'Room not found',
        });
        return;
      }

      socket.join(roomId);
      console.log("Room members:");
console.log(io.sockets.adapter.rooms.get(roomId));
console.log("Joined socket room:", roomId);
console.log("Socket ID:", socket.id);
console.log("Current users:", room.users.length);

      console.log('================================');
      console.log('Room members:');
      console.log(io.sockets.adapter.rooms.get(roomId));
      console.log('Joined socket room:', roomId);
      console.log('Socket ID:', socket.id);
      console.log('Current users:', room.users.length);
      console.log('================================');

      socket.to(roomId).emit('user-joined', {
        username,
        users: room.users,
      });
console.log('SENDING ROOM-JOINED EVENT');

      socket.emit('room-joined', {
        roomId: room.roomId,
        users: room.users,
        code: room.code,
        language: room.language,
      });
console.log('ROOM-JOINED EVENT SENT');
      console.log(`User ${username} joined room: ${roomId}`);
    });

    // Code Change
    socket.on('code-change', ({ roomId, code }) => {
      console.log('Code change received');
      console.log('Room:', roomId);
      console.log('Code:', code);

      const room = roomManager.updateCode(roomId, code);

      if (!room) {
        console.log('Room not found');
        return;
      }

      io.emit('code-update', {
  code,
});

      console.log('Broadcast sent');
    });

    // Language Change
    socket.on('language-change', ({ roomId, language }) => {
      console.log(
        `Language change in room: ${roomId} to ${language}`
      );

      const room = roomManager.updateLanguage(
        roomId,
        language
      );

      if (!room) {
        return;
      }

      io.to(roomId).emit('language-update', {
        language,
      });
    });

    // Disconnect
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);

      const allRooms = roomManager.getAllRooms();

      for (const [roomId, room] of allRooms) {
        const userInRoom = room.users.find(
          (user) => user.socketId === socket.id
        );

        if (userInRoom) {
          const updatedRoom = roomManager.leaveRoom(
            roomId,
            socket.id
          );

          if (updatedRoom) {
            io.to(roomId).emit('user-left', {
              username: userInRoom.username,
              users: updatedRoom.users,
            });

            console.log(
              `User ${userInRoom.username} left room: ${roomId}`
            );
          } else {
            console.log(
              `Room ${roomId} deleted (no users remaining)`
            );
          }
        }
      }
    });
  });
}

module.exports = registerSocketHandlers;