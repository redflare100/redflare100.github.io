// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChroniclerView from './components/Chronicler/ChroniclerView';
import AwakenedView from './components/Awakened/AwakenedView';
import Home from './components/Home';
import { SocketProvider } from './SocketContext';

function App() {
  return (
    <SocketProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chronicler" element={<ChroniclerView />} />
          <Route path="/awakened" element={<AwakenedView />} />
        </Routes>
      </Router>
    </SocketProvider>
  );
}

export default App;

