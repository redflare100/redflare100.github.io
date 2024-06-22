// src/components/AwakenedView/AwakenedView.js
import React from 'react';
import CombatList from './CombatList';
import './Awakened.css';

const AwakenedView = () => {
  return (
    <div className="awakened-container">
          
      <div className="combat-list" style={{width: '100%', padding:"10px"}}>
        <h2>Combat List</h2>
        <div className='divider-horizontal'/>
        <CombatList />
      </div>

    </div>
  );
};

export default AwakenedView;
