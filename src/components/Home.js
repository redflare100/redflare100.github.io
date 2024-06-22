// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Divine Descension Combat Tracker</h1>
      <div className="button-container">
        <Link to="/chronicler" className="home-button">
          Chronicler View
        </Link>
        <Link to="/awakened" className="home-button">
          Awakened View
        </Link>
      </div>
    </div>
  );
};

export default Home;
