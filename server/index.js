// server/index.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());
app.use(express.json());

let combatList = [];

// Handle client connections
io.on('connection', (socket) => {
  console.log('a user connected');

  // Send current combat list to newly connected client
  socket.emit('combatList', combatList);

  // Handle chronicler adding a character
  socket.on('addCharacter', (character) => {
    character.currentHP = character.maxHP; // Initialize currentHP to maxHP
    combatList.push(character);
    io.emit('combatList', combatList); // Broadcast updated list to all clients
  });

  // Handle chronicler updating the combat list
  socket.on('updateCombatList', (newCombatList) => {
    combatList = newCombatList;
    io.emit('combatList', combatList); // Broadcast updated list to all clients
  });

  // Handle chronicler clearing the combat list
  socket.on('clearCombatList', () => {
    combatList = [];
    io.emit('combatList', combatList); // Broadcast the cleared list to all clients
  });

  // Handle chronicler removing a character
  socket.on('removeCharacter', (index) => {
    if (index >= 0 && index < combatList.length) {
      combatList.splice(index, 1);
      io.emit('combatList', combatList); // Broadcast updated list to all clients
    }
  });

  // Handle updating a character's currentHP
  socket.on('updateCharacterHP', (index, hpChange) => {
    if (index >= 0 && index < combatList.length) {
      combatList[index].currentHP = Math.max(0, combatList[index].currentHP + hpChange);
      io.emit('combatList', combatList); // Broadcast updated list to all clients
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

