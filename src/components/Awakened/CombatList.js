import React, { useEffect, useState } from 'react';
import { useSocket } from '../../SocketContext';
import './Awakened.css';
import dodgeSymbol from '../../assets/Site-Dodge_Symbol.png';
import d20Symbol from '../../assets/Site-D20_Symbol.png';
import egoSymbol from '../../assets/Site-Ego_Symbol.png';
import vesSymbol from '../../assets/Site-Ves_Symbol.png';
import CharacterProfile from './CharacterProfile';

const CombatList = () => {
  const [combatList, setCombatList] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on('combatList', (list) => {
        setCombatList(list);
      });
    }

    return () => {
      if (socket) {
        socket.off('combatList');
      }
    };
  }, [socket]);

  const getHpStatus = (currentHP, maxHP) => {
    const hpPercentage = (currentHP / maxHP) * 100;
    if (currentHP === 0) return 'Dead';
    if (hpPercentage === 100) return 'Uninjured';
    if (hpPercentage >= 75) return 'Injured';
    if (hpPercentage >= 25) return 'Bloodied';
    if (hpPercentage >= 1) return 'Mortally Wounded';
    return 'Unknown'; // Fallback for edge cases
  };

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  const handleCloseProfile = () => {
    setSelectedCharacter(null);
  };

  return (
    <div className="combat-list-container" style={{height:'calc(90%)'}}>
      <div className="character-list">
        {selectedCharacter && (
          <CharacterProfile character={selectedCharacter} combatList={combatList} onClose={handleCloseProfile} />
        )}
      </div>
      <div className="combat-list">
        <ul style={{ marginTop: '0px' }}>
          {combatList.map((character, index) => (
            <React.Fragment key={index}>
              <li className='character-container' style={{ alignItems: "center" }}>
                <p style={{ display: "flex", textAlign: 'center', alignItems: "center", marginLeft: "0px", marginTop: "0px", marginBottom: "0px" }}>
                  <h3 onClick={() => handleCharacterClick(character)}>{character.name} |</h3>
                  <img src={d20Symbol} alt="d20" style={{ width: '23px', height: '23px' }} />
                  <p style={{ fontSize: "1.1rem" }}>: {character.initiativeRoll} |</p>
                  <img src={dodgeSymbol} alt="Dodge Symbol" style={{ width: '22px', height: '22px' }} />
                  <p style={{ fontSize: "1.1rem" }}>: {character.dodge} |</p>
                </p>
                {character.type === "Player" ? (
                  <h3 style={{ display: "flex", alignItems: "center", marginLeft: "0px", marginTop: "0px", marginBottom: "0px" }}>
                    HP: {character.currentHP} / {character.maxHP} |
                    <p style={{ display: "flex", textAlign: 'center', alignItems: "center", marginLeft: "0px", marginTop: "0px", marginBottom: "0px" }}>
                      <img src={vesSymbol} alt="Vessel Symbol" style={{ width: '25px', height: '25px' }} />
                      <p style={{ fontSize: "1.1rem" }}>:{character.currentVes} / {character.ves} |</p>
                      <img src={egoSymbol} alt="Ego Symbol" style={{ width: '22px', height: '22px' }} />
                      <p style={{ fontSize: "1.1rem" }}>:{character.currentEgp} / {character.ego} |</p>
                    </p>
                  </h3>
                ) : (
                  <h3 style={{ display: "flex", alignItems: "center", marginLeft: "0px", marginTop: "0px", marginBottom: "0px" }}>
                    {getHpStatus(character.currentHP, character.maxHP)}
                  </h3>
                )}
              </li>
              <hr className="divider-horizontal" />
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CombatList;
