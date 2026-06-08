// In-memory room state management
const rooms = new Map();

/**
 * Create a new room
 * @param {string} roomId - Unique room identifier
 * @param {string} username - Username of the creator
 * @param {string} socketId - Socket ID of the creator
 * @returns {object} Room data
 */
function createRoom(roomId, username, socketId) {
  const room = {
    roomId,
    users: [{ socketId, username }],
    code: '',
    language: 'javascript',
    createdAt: new Date().toISOString(),
  };
  rooms.set(roomId, room);
  return room;
}

/**
 * Join an existing room
 * @param {string} roomId - Room identifier
 * @param {string} username - Username of the joining user
 * @param {string} socketId - Socket ID of the joining user
 * @returns {object|null} Room data or null if room doesn't exist
 */
function joinRoom(roomId, username, socketId) {
  const room = rooms.get(roomId);
  if (!room) {
    return null;
  }

  // Check if user already exists in room
  const existingUser = room.users.find((user) => user.username === username);
  if (existingUser) {
    // Update socket ID if user rejoins
    existingUser.socketId = socketId;
  } else {
    // Add new user
    room.users.push({ socketId, username });
  }

  return room;
}

/**
 * Leave a room
 * @param {string} roomId - Room identifier
 * @param {string} socketId - Socket ID of the leaving user
 * @returns {object|null} Updated room data or null if room was deleted
 */
function leaveRoom(roomId, socketId) {
  const room = rooms.get(roomId);
  if (!room) {
    return null;
  }

  // Remove user from room
  room.users = room.users.filter((user) => user.socketId !== socketId);

  // Delete room if no users left
  if (room.users.length === 0) {
    rooms.delete(roomId);
    return null;
  }

  return room;
}

/**
 * Get room data
 * @param {string} roomId - Room identifier
 * @returns {object|null} Room data or null if room doesn't exist
 */
function getRoom(roomId) {
  return rooms.get(roomId) || null;
}

/**
 * Update code in a room
 * @param {string} roomId - Room identifier
 * @param {string} code - New code content
 * @returns {object|null} Updated room data or null if room doesn't exist
 */
function updateCode(roomId, code) {
  const room = rooms.get(roomId);
  if (!room) {
    return null;
  }

  room.code = code;
  return room;
}

/**
 * Update programming language in a room
 * @param {string} roomId - Room identifier
 * @param {string} language - New programming language
 * @returns {object|null} Updated room data or null if room doesn't exist
 */
function updateLanguage(roomId, language) {
  const room = rooms.get(roomId);
  if (!room) {
    return null;
  }

  room.language = language;
  return room;
}

/**
 * Get list of users in a room
 * @param {string} roomId - Room identifier
 * @returns {Array} Array of users or empty array if room doesn't exist
 */
function getUsers(roomId) {
  const room = rooms.get(roomId);
  return room ? room.users : [];
}

/**
 * Get all rooms (for debugging)
 * @returns {Map} All rooms
 */
function getAllRooms() {
  return rooms;
}

module.exports = {
  createRoom,
  joinRoom,
  leaveRoom,
  getRoom,
  updateCode,
  updateLanguage,
  getUsers,
  getAllRooms,
};
