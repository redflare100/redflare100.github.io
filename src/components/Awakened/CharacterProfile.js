import React, { useEffect, useState } from 'react';
import './Awakened.css';
import CharacterNotes from './CharacterNotes';

const CharacterProfile = ({ character, combatList, onClose }) => {
  const [fullCharacter, setFullCharacter] = useState({});
  const [notes, setNotes] = useState('');

  useEffect(() => {
    let selectedCharacter;

    // Check if the character is already saved in local storage
    console.log(character.name);
    console.log('Combat list:', combatList);
    
    // Find the character in the combatList
    const foundCharacter = combatList.find(char => char.name === character.name);
    if (foundCharacter && foundCharacter.type === "Player") {
      console.log("Character found in combat list");
      // If the character is found in the combatList, use its data to create a new character
      selectedCharacter = {
        ...foundCharacter,
        currentHP: foundCharacter.maxHP,
        hitDie: foundCharacter.hitDie,
        stats: {
          STR: parseInt(foundCharacter.stats.STR),
          DEX: parseInt(foundCharacter.stats.DEX),
          CON: parseInt(foundCharacter.stats.CON),
          INT: parseInt(foundCharacter.stats.INT),
          WIS: parseInt(foundCharacter.stats.WIS),
          CHA: parseInt(foundCharacter.stats.CHA)
        },
        mods: {
          STR: parseInt(foundCharacter.stats.STR) - 5,
          DEX: parseInt(foundCharacter.stats.DEX) - 5,
          CON: parseInt(foundCharacter.stats.CON) - 5,
          INT: parseInt(foundCharacter.stats.INT) - 5,
          WIS: parseInt(foundCharacter.stats.WIS) - 5,
          CHA: parseInt(foundCharacter.stats.CHA) - 5
        },
        arcana: foundCharacter.arcana,
        fatalFlaw: foundCharacter.fatalFlaw,
        actions: [],
        mythos: {
          name: foundCharacter.mythos.name,
          type: foundCharacter.mythos.type,
          subtype: foundCharacter.mythos.subtype,
          pantheon: foundCharacter.mythos.pantheon,
          specialty: foundCharacter.mythos.specialty,
          affinity: foundCharacter.mythos.affinity,
          domain: foundCharacter.mythos.domain,
          arcana: foundCharacter.mythos.arcana
        }
      };
    } else {
      console.log("Character is an NPC, Creating an empty new one");
      // If the character is an NPC found in the combatList, create a blank character with only name and type added by default
      selectedCharacter = {
        name: character.name,
        type: character.type,
        currentHP: null,
        hitDie: null,
        stats: {
          STR: null,
          DEX: null,
          CON: null,
          INT: null,
          WIS: null,
          CHA: null
        },
        mods: {
          STR: null,
          DEX: null,
          CON: null,
          INT: null,
          WIS: null,
          CHA: null
        },
        arcana: null,
        fatalFlaw: null,
        actions: [],
        mythos: {
          name: null,
          type: null,
          subtype: null,
          pantheon: null,
          specialty: null,
          affinity: null,
          domain: null,
          arcana: null
        }
      };
    }
    // Save the new character to local storage
    localStorage.setItem(`character_${character.name}`, JSON.stringify(selectedCharacter));

    // Set the selected character to the state
    setFullCharacter(selectedCharacter);

    const savedNotes = localStorage.getItem(`notes_${character.name}`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [character, combatList]);

  const handleNotesChange = (event) => {
    const newNotes = event.target.value;
    setNotes(newNotes);
    localStorage.setItem(`notes_${character.name}`, newNotes);
  };

  return (
    <div className='character-profile'>
      <h2>{fullCharacter.name} - {fullCharacter.type}</h2>
      {fullCharacter.type === 'Player' ? (
        <div style={{width:'95%'}}>
          <div className='divider-horizontal' style={{margin:"0px"}}/>
          <div className='stats-container'>
            <p>Arcana: {fullCharacter.arcana}</p>
            <p>Fatal Flaw: {fullCharacter.fatalFlaw}</p>
          </div>
          <div className='divider-horizontal' style={{margin:"0px"}}/>
          <div className='stats-container'>
            <p> HP: {fullCharacter.currentHP} / {fullCharacter.maxHP} ({fullCharacter.hitDie})</p>
            <p> Dodge: {fullCharacter.dodge} </p>
            <p> Initiative Roll: {fullCharacter.initiativeRoll}</p>
          </div>
          <div className='divider-horizontal' style={{margin:"0px"}}/>
          <div className="stats-container">
            <h3 style={{marginBottom: "0px"}}>STR</h3>
            <h3 style={{marginBottom: "0px"}}>DEX</h3>
            <h3 style={{marginBottom: "0px"}}>CON</h3>
            <h3 style={{marginBottom: "0px"}}>INT</h3>
            <h3 style={{marginBottom: "0px"}}>WIS</h3>
            <h3 style={{marginBottom: "0px"}}>CHA</h3>
          </div>
            <div className="stats-container">
            <p style={{marginBottom: "0px"}}>{fullCharacter.stats.STR}</p>
            <p style={{marginBottom: "0px"}}>{fullCharacter.stats.DEX}</p>
            <p style={{marginBottom: "0px"}}>{fullCharacter.stats.CON}</p>
            <p style={{marginBottom: "0px"}}>{fullCharacter.stats.INT}</p>
            <p style={{marginBottom: "0px"}}>{fullCharacter.stats.WIS}</p>
            <p style={{marginBottom: "0px"}}>{fullCharacter.stats.CHA}</p>
          </div>
          <div className="stats-container">
            <p style={{marginTop: "0px"}}>{fullCharacter.mods.STR >= 5 ? `[+${fullCharacter.mods.STR}]` : `[${fullCharacter.mods.STR}]`}</p>
            <p style={{marginTop: "0px"}}>{fullCharacter.mods.DEX >= 5 ? `[+${fullCharacter.mods.DEX}]` : `[${fullCharacter.mods.DEX}]`}</p>
            <p style={{marginTop: "0px"}}>{fullCharacter.mods.CON >= 5 ? `[+${fullCharacter.mods.CON}]` : `[${fullCharacter.mods.CON}]`}</p>
            <p style={{marginTop: "0px"}}>{fullCharacter.mods.INT >= 5 ? `[+${fullCharacter.mods.INT}]` : `[${fullCharacter.mods.INT}]`}</p>
            <p style={{marginTop: "0px"}}>{fullCharacter.mods.WIS >= 5 ? `[+${fullCharacter.mods.WIS}]` : `[${fullCharacter.mods.WIS}]`}</p>
            <p style={{marginTop: "0px"}}>{fullCharacter.mods.CHA >= 5 ? `[+${fullCharacter.mods.CHA}]` : `[${fullCharacter.mods.CHA}]`}</p>
          </div>
          <div className='divider-horizontal' style={{margin:"0px"}}/>
          <h3 style={{marginBottom: "0px", textAlign:'center'}}> Mythos - {fullCharacter.mythos.name}</h3>
          <h4 className='stat-container'>Type - {fullCharacter.mythos.type}, {fullCharacter.mythos.subtype}</h4>
          <h4> Pantheon - {fullCharacter.mythos.pantheon}</h4>
          <div className="stats-container">
            <h4 style={{marginTop: "0px"}}>Specialty - {fullCharacter.mythos.specialty}</h4>
            <h4 style={{marginTop: "0px"}}>Affinity - {fullCharacter.mythos.affinity}</h4>
            <h4 style={{marginTop: "0px"}}>Arcana - {fullCharacter.mythos.arcana}</h4>
          </div>
        </div>
      ) : (
        <div>
          <CharacterNotes character={fullCharacter} />
        </div>
      )}
      <div className='divider-horizontal' style={{margin:"0px"}}>
        <textarea
          className='stats-container'
          placeholder='Enter your notes here...'
          value={notes}
          onChange={handleNotesChange}
        ></textarea>
      </div>
    </div>
  );
};

const getHpStatus = (currentHP, maxHP) => {
  const hpPercentage = (currentHP / maxHP) * 100;
  if (currentHP === 0) return 'Dead';
  if (hpPercentage === 100) return 'Uninjured';
  if (hpPercentage >= 75) return 'Injured';
  if (hpPercentage >= 25) return 'Bloodied';
  if (hpPercentage >= 1) return 'Mortally Wounded';
  return 'Unknown';
};

export default CharacterProfile;
