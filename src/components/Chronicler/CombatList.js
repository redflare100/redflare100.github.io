import React, { useEffect, useState } from 'react';
import './Chronicler.css';
import dodgeSymbol from '../../assets/Site-Dodge_Symbol.png'; 
import d20Symbol from '../../assets/Site-D20_Symbol.png';
import egoSymbol from '../../assets/Site-Ego_Symbol.png';
import vesSymbol from '../../assets/Site-Ves_Symbol.png';

const CombatList = ({ combatList, socket }) => {
  const [localCombatList, setLocalCombatList] = useState(combatList);
  const [editingIndex, setEditingIndex] = useState(null);
  const [hpChange, setHpChange] = useState('');

  useEffect(() => {
    setLocalCombatList(combatList);
  }, [combatList]);

  useEffect(() => {
    if (socket) {
      socket.on('updateInitiativeRolls', (newInitiativeRolls) => {
        setLocalCombatList((prevList) =>
          prevList.map((character, index) => ({
            ...character,
            initiativeRoll: newInitiativeRolls[index]
          }))
        );
      });
    }

    return () => {
      if (socket) {
        socket.off('updateInitiativeRolls');
      }
    };
  }, [socket]);

  const removeFromCombatList = (index) => {
    if (socket) {
      socket.emit('removeCharacter', index);
    }
  };

  const handleHpChangeSubmit = (index) => {
    const change = parseInt(hpChange, 10);
    if (!isNaN(change)) {
      socket.emit('updateCharacterHP', index, change);
    }
    setEditingIndex(null);
    setHpChange('');
  };

  return (
    <div>
      <ul style={{marginTop:'0px'}}>
        {localCombatList.map((character, index) => (
          <React.Fragment key={index}>
            <li className='character-container' style={{alignItems: "center", flexWrap:"wrap"}}>
              <p style={{display: "flex", textAlign: 'center', alignItems: "center", marginLeft: "0px", marginTop: "0px", marginBottom: "0px"}}>
                <h3>{character.name} |</h3> 
                <img src={d20Symbol} alt="d20" style={{ width: '23px', height: '23px' }} />
                <p style={{fontSize:"1.1rem"}}>: {character.initiativeRoll} |</p>
                <img src={dodgeSymbol} alt="Dodge Symbol" style={{ width: '22px', height: '22px' }} />
                <p style={{fontSize:"1.1rem"}}>: {character.dodge} |</p>
                <img src={vesSymbol} alt="Vessel Symbol" style={{ width: '25px', height: '25px' }} />
                <p style={{fontSize:"1.1rem"}}>:{character.currentVes}/ {character.ves} |</p>
                <img src={egoSymbol} alt="Ego Symbol" style={{ width: '22px', height: '22px' }} />
                <p style={{fontSize:"1.1rem"}}>: {character.currentEgp}/{character.ego} |</p>
              </p>
              {editingIndex === index ? (
                <div style={{display: "flex", cursor: "pointer"}}>
                  <input
                    type="number"
                    value={hpChange}
                    onChange={(e) => setHpChange(e.target.value)}
                    placeholder="Enter HP change"
                  />
                  <button onClick={() => handleHpChangeSubmit(index)}>Submit</button>
                </div>
              ) : (
                <h3 style={{display: "flex", alignItems: "center", marginLeft: "0px", marginTop: "0px", marginBottom: "0px", cursor: "pointer"}} onClick={() => setEditingIndex(index)} >
                  HP: {character.currentHP} / {character.maxHP} 
                </h3>
              )}
              <button style={{height: "20px"}} className='delete-button' onClick={() => removeFromCombatList(index)}>Remove</button>
            </li>
            <hr className="divider-horizontal" />
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default CombatList;
