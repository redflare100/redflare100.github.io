import React, { useState, useEffect } from 'react';
import CharacterCreator from './CharacterCreator';
import CharacterList from './CharacterList';
import CombatList from './CombatList';
import { useSocket } from '../../SocketContext';
import './Chronicler.css';

const ChroniclerView = () => {
  const [combatList, setCombatList] = useState([]);
  const [round, setRound] = useState(0);
  const [turn, setTurn] = useState(null);
  const [combatStarted, setCombatStarted] = useState(false);
  const [turnIndex, setTurnIndex] = useState(0);
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on('updateCombatList', (list) => {
        setCombatList(list);
        if (combatStarted) {
          setTurn(list[turnIndex]);
        }
      });
      socket.on('clearCombatList', () => {
        setCombatList([]);
        setCombatStarted(false);
        setRound(0);
        setTurn(null);
        setTurnIndex(0);
      });

      socket.on('combatList', (list) => {
        setCombatList(list);
        if (combatStarted) {
          setTurn(list[turnIndex]);
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('updateCombatList');
        socket.off('clearCombatList');
        socket.off('combatList');
      }
    };
  }, [socket, combatStarted, turnIndex]);

  const clearCombatList = () => {
    if (socket) {
      socket.emit('clearCombatList');
    }
  };

  const startCombat = () => {
    if (combatList.length >= 1) {
      const updatedCombatList = combatList.map(character => ({
        ...character,
        initiativeRoll: Math.floor(Math.random() * 20) + 1 + character.initiative
      })).sort((a, b) => b.initiativeRoll - a.initiativeRoll);

      setCombatList(updatedCombatList);
      if (socket) {
        socket.emit('updateCombatList', updatedCombatList);
      }
      setCombatStarted(true);
      setRound(1);
      setTurnIndex(0);
      setTurn(updatedCombatList[0]);
    }
  };

  const endCombat = () => {
    if (combatStarted) {
      const remainingCharacters = combatList.filter(character => character.isPlayer);
      setCombatList(remainingCharacters);
      if (socket) {
        socket.emit('updateCombatList', remainingCharacters);
      }
      setCombatStarted(false);
      setRound(0);
      setTurn(null);
      setTurnIndex(0);
    }
  };

  const nextTurn = () => {
    if (combatStarted) {
      const nextIndex = (turnIndex + 1) % combatList.length;
      if (nextIndex === 0) {
        setRound(prevRound => prevRound + 1);
      }
      setTurnIndex(nextIndex);
      setTurn(combatList[nextIndex]);
    }
  };

  return (
    <div className="chronicler-container">
      <div className="character-creator">
        <h2>Character Creator</h2>
        <div className='divider-horizontal'/>
        <CharacterCreator />
      </div>
      <div className="combat-list">
        <h2>Combat List</h2>
        <div className='divider-horizontal'/>
        <div className='character-container'>
          <button onClick={clearCombatList}>Clear Combat List</button>
          <button onClick={startCombat}>Start Combat</button>
          <button onClick={endCombat}>End Combat</button>
          <button onClick={nextTurn} disabled={!combatStarted}>Next Turn</button>
        </div>
        {combatStarted && (
          <div className='character-container'>
            <h3>Current Turn: {turn ? turn.name : 'N/A'}</h3>
            <h3>Round: {round}</h3>
          </div>
        )}
        <div className='divider-horizontal'/>
        <CombatList combatList={combatList} socket={socket} />
      </div>
      <div className="character-list">
        <h2>Character List</h2>
        <CharacterList />
      </div>
    </div>
  );
};

export default ChroniclerView;
