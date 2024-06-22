import React, { useState, useEffect, useCallback } from 'react';
import { useSocket } from '../../SocketContext';
import './Chronicler.css';

const CharacterCreator = () => {
  const [characters, setCharacters] = useState([]);
  const [name, setName] = useState('');
  const [maxHP, setMaxHP] = useState('');
  const [str, setStr] = useState('');
  const [dex, setDex] = useState('');
  const [con, setCon] = useState('');
  const [int, setInt] = useState('');
  const [wis, setWis] = useState('');
  const [cha, setCha] = useState('');
  const [dodge, setDodge] = useState('');
  const [initiative, setInitiative] = useState('');
  const [fatalFlaw, setFatalFlaw] = useState('');
  const [hitDie, setHitDie] = useState('');
  const [arcana, setArcana] = useState('');
  const [characterType, setCharacterType] = useState('NPC');
  const [ves, setVes] = useState(0);
  const [ego, setEgo] = useState(0);
  const [mythos, setMythos] = useState({
    name: '',
    type: '',
    subtype: '',
    pantheon: '',
    specialty: '',
    affinity: '',
    domain: '',
    arcana: ''
  });

  const socket = useSocket();

  useEffect(() => {
    if (dex) {
      const dexMod = parseInt(dex) - 5;
      setDodge(10 + dexMod);
      setInitiative(dexMod);
    }
  }, [dex]);

  useEffect(() => {
    // Load characters from local storage when the component mounts
    const savedCharacters = JSON.parse(localStorage.getItem('characters')) || [];
    setCharacters(savedCharacters);
  }, []);

  const calculateVes = useCallback(() => {
    const stats = [parseInt(str), parseInt(dex), parseInt(con)].filter(Number.isFinite);
    stats.sort((a, b) => b - a);
    setVes(stats.slice(0, 2).reduce((acc, curr) => acc + curr, 0));
  }, [str, dex, con]);

  const calculateEgo = useCallback(() => {
    const stats = [parseInt(wis), parseInt(int), parseInt(cha)].filter(Number.isFinite);
    stats.sort((a, b) => b - a);
    setEgo(stats.slice(0, 2).reduce((acc, curr) => acc + curr, 0));
  }, [wis, int, cha]);

  useEffect(() => {
    calculateVes();
  }, [str, dex, con, calculateVes]);

  useEffect(() => {
    calculateEgo();
  }, [wis, int, cha, calculateEgo]);

  const addCharacter = () => {
    if (
      name &&
      maxHP &&
      str &&
      dex &&
      con &&
      int &&
      wis &&
      cha &&
      dodge &&
      initiative &&
      fatalFlaw &&
      hitDie &&
      socket
    ) {
      const newCharacter = {
        name,
        maxHP: parseInt(maxHP),
        currentHP: parseInt(maxHP), // Initialize currentHP to maxHP
        stats: {
          STR: parseInt(str),
          DEX: parseInt(dex),
          CON: parseInt(con),
          INT: parseInt(int),
          WIS: parseInt(wis),
          CHA: parseInt(cha)
        },
        mods: {
          STR: parseInt(str) - 5,
          DEX: parseInt(dex) - 5,
          CON: parseInt(con) - 5,
          INT: parseInt(int) - 5,
          WIS: parseInt(wis) - 5,
          CHA: parseInt(cha) - 5
        },
        dodge: parseInt(dodge),
        initiative: parseInt(initiative),
        fatalFlaw,
        hitDie,
        mythos,
        arcana,
        type: characterType,
        ves: ves,
        ego: ego,
        currentVes: ves,
        currentEgp: ego,
        actions: []
      };
  
      // Save new character locally
      const updatedCharacters = [...characters, newCharacter];
      setCharacters(updatedCharacters);
      localStorage.setItem('characters', JSON.stringify(updatedCharacters));
  
      // Reset form fields after adding character
      setName('');
      setMaxHP('');
      setStr('');
      setDex('');
      setCon('');
      setInt('');
      setWis('');
      setCha('');
      setDodge('');
      setInitiative('');
      setFatalFlaw('');
      setArcana('');
      setHitDie('');
      setCharacterType('NPC');
      setVes(0);
      setEgo(0);
      setMythos({
        name: '',
        type: '',
        subtype: '',
        pantheon: '',
        specialty: '',
        affinity: '',
        domain: '',
        arcana: ''
      });
    } else {
      console.error("All required fields must be filled");
    }
  };  

  return (
    <div className="character-creator-input">
      <div className='stats-container'>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Character Name"
        />
        <select
          value={characterType}
          onChange={(e) => setCharacterType(e.target.value)}
        >
          <option value="Player">Player</option>
          <option value="NPC">NPC</option>
        </select>
      </div>
      <div className="stats-container">
        <select
          value={fatalFlaw}
          onChange={(e) => setFatalFlaw(e.target.value)}
        >
          <option value="">Fatal Flaw</option>
          <option value="Greed">Greed</option>
          <option value="Arrogance">Arrogance</option>
          <option value="Impatience">Impatience</option>
          <option value="Self-Destruction">Self-Destruction</option>
          <option value="Self-Deprecation">Self-Deprecation</option>
          <option value="Martyrdom">Martyrdom</option>
          <option value="Stubbornness">Stubbornness</option>
        </select>
        <select
          value={arcana}
          onChange={(e) => setArcana(e.target.value)}
        >
          <option value="">Arcana</option>
          <option value="Strength">Strength</option>
          <option value="Chariot">Chariot</option>
          <option value="Temperance">Temperance</option>
          <option value="Magician">Magician</option>
          <option value="High Priestess">High Priestess</option>
          <option value="Hierophant">Hierophant</option>
          <option value="The Fool">The Fool</option>
          <option value="The Empress">The Empress</option>
          <option value="The Emperor">The Emperor</option>
          <option value="The Lovers">The Lovers</option>
          <option value="The Hermit">The Hermit</option>
          <option value="Wheel of Fortune">Wheel of Fortune</option>
          <option value="Justice">Justice</option>
          <option value="Hanged Man">Hanged Man</option>
          <option value="Death">Death</option>
          <option value="Devil">Devil</option>
          <option value="The Tower">The Tower</option>
          <option value="The Star">The Star</option>
          <option value="The Moon">The Moon</option>
          <option value="The Sun">The Sun</option>
          <option value="The World">The World</option>
          <option value="Judgement">Judgement</option>
        </select>
      </div>
      <div className="stats-container">
        <input
          type="number"
          value={maxHP}
          onChange={(e) => setMaxHP(e.target.value)}
          placeholder="Max HP"
        />
        <input
          type="text"
          value={hitDie}
          onChange={(e) => setHitDie(e.target.value)}
          placeholder="HitDie"
        />
      </div>
      <div className="stats-container">
        <input
          type="number"
          value={str}
          onChange={(e) => setStr(e.target.value)}
          placeholder="STR"
        />
        <input
          type="number"
          value={dex}
          onChange={(e) => setDex(e.target.value)}
          placeholder="DEX"
        />
        <input
          type="number"
          value={con}
          onChange={(e) => setCon(e.target.value)}
          placeholder="CON"
        />
        <input
          type="number"
          value={int}
          onChange={(e) => setInt(e.target.value)}
          placeholder="INT"
        />
        <input
          type="number"
          value={wis}
          onChange={(e) => setWis(e.target.value)}
          placeholder="WIS"
        />
        <input
          type="number"
          value={cha}
          onChange={(e) => setCha(e.target.value)}
          placeholder="CHA"
        />
      </div>
      <div className="stats-container">
        <input
          type="number"
          value={dodge}
          onChange={(e) => setDodge(e.target.value)}
          placeholder="Dodge"
        />
        <input
          type="number"
          value={initiative}
          onChange={(e) => setInitiative(e.target.value)}
          placeholder="Initiative"
        />
        <input
          type="number"
          value={ves}
          onChange={(e) => setVes(e.target.value)}
          placeholder="VES"
        />
        <input
          type="number"
          value={ego}
          onChange={(e) => setEgo(e.target.value)}
          placeholder="EGO"
        />
      </div>
      <div className='divider-horizontal'/>
      <input
        type="text"
        value={mythos.name}
        onChange={(e) => setMythos({ ...mythos, name: e.target.value })}
        placeholder="Mythos Name"
      />
      <input
        type="text"
        value={mythos.pantheon}
        onChange={(e) => setMythos({ ...mythos, pantheon: e.target.value })}
        placeholder="Mythos Pantheon"
      />
      <div className="stats-container">
        <input
          type="text"
          value={mythos.type}
          onChange={(e) => setMythos({ ...mythos, type: e.target.value })}
          placeholder="Mythos Type"
        />
        <input
          type="text"
          value={mythos.subtype}
          onChange={(e) => setMythos({ ...mythos, subtype: e.target.value })}
          placeholder="Mythos Subtype"
        />
      </div>
      <div className="stats-container">
        <select
          value={mythos.specialty}
          onChange={(e) => setMythos({ ...mythos, specialty: e.target.value })}
        >
          <option value="">Specialty</option>
          <option value="Create">Create</option>
          <option value="Control">Control</option>
          <option value="Comprehend">Comprehend</option>
          <option value="Change">Change</option>
        </select>
        <select
          value={mythos.affinity}
          onChange={(e) => setMythos({ ...mythos, affinity: e.target.value })}
        >
          <option value="">Affinity</option>
          <option value="Physical">Physical</option>
          <option value="Burning">Burning</option>
          <option value="Freezing">Freezing</option>
          <option value="Lightning">Lightning</option>
          <option value="Kinetic">Kinetic</option>
          <option value="Positive">Positive</option>
          <option value="Neutral">Neutral</option>
          <option value="Negative">Negative</option>
        </select>
        <select
          value={mythos.arcana}
          onChange={(e) => setMythos({ ...mythos, arcana: e.target.value })}
        >
          <option value="">Arcana</option>
          <option value="Strength">Strength</option>
          <option value="Chariot">Chariot</option>
          <option value="Temperance">Temperance</option>
          <option value="Magician">Magician</option>
          <option value="High Priestess">High Priestess</option>
          <option value="Hierophant">Hierophant</option>
          <option value="The Fool">The Fool</option>
          <option value="The Empress">The Empress</option>
          <option value="The Emperor">The Emperor</option>
          <option value="The Lovers">The Lovers</option>
          <option value="The Hermit">The Hermit</option>
          <option value="Wheel of Fortune">Wheel of Fortune</option>
          <option value="Justice">Justice</option>
          <option value="Hanged Man">Hanged Man</option>
          <option value="Death">Death</option>
          <option value="Devil">Devil</option>
          <option value="The Tower">The Tower</option>
          <option value="The Star">The Star</option>
          <option value="The Moon">The Moon</option>
          <option value="The Sun">The Sun</option>
          <option value="The World">The World</option>
          <option value="Judgement">Judgement</option>
        </select>
      </div>
      <div className='divider-horizontal'/>
      <button onClick={addCharacter}>Add Character</button>
    </div>
  );
};

export default CharacterCreator;
