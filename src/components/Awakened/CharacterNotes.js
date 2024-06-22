import React, { useState, useEffect } from 'react';

const CharacterNotes = ({ character }) => {
  const [stats, setStats] = useState({
    STR: '',
    DEX: '',
    CON: '',
    INT: '',
    WIS: '',
    CHA: '',
    damageTaken:'',
    maxHP:'',
    hitDie:'',
    fatalFlaw:'',
    arcana:'',
    VES:'',
    EGO:'',
    initiative:'',
    dodge:'',
    mythosName:'',
    mythosType:'',
    mythosSubtype:'',
    mythosPantheon:'',
    mythosSpecialty:'',
    mythosDomain:'',
    mythosArcana:'',
  });

  useEffect(() => {
    const savedStats = localStorage.getItem(`stats_${character.name}`);
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, [character.name]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStats((prevStats) => {
      const updatedStats = { ...prevStats, [name]: value };
      localStorage.setItem(`stats_${character.name}`, JSON.stringify(updatedStats));
      return updatedStats;
    });
  };

  return (
    <div className='character-creator-input'>
      <div className="stats-container">
        <select
          value={stats.fatalFlaw}
          onChange={handleInputChange}
          name='fatalFlaw'
          placeholder='Fatal Flaw'
        >
          <option value="">Fatal Flaw</option>
          <option value="Greed">Greed</option>
          <option value="Arrogance">Arrogance</option>
          <option value="Impatience">Impatience</option>
          <option value="Self-Destruction">Self-Destruction</option>
          <option value="Self-Deprecation">Self-Deprecation</option>
          <option value="Martyrdom">Martyrdom</option>
          <option value="Stubbornness">Stubbornness</option>
          <option value="Unknown">Unknown</option>
        </select>
        <select
          value={stats.arcana}
          onChange={handleInputChange}
          name='arcana'
          placeholder='Arcana'
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
          <option value="Unknown">Unknown</option>
        </select>
      </div>
      <div className="stats-container">
        <input
          type="number"
          value={stats.damageTaken}
          onChange={handleInputChange}
          placeholder="Damage Taken"
          name="damageTaken"
        />
        <input
          type="number"
          value={stats.maxHP}
          onChange={handleInputChange}
          placeholder="Max HP"
          name="maxHP"
        />
        <input
          type="text"
          value={stats.hitDie}
          onChange={handleInputChange}
          placeholder="HitDie"
          name="hitDie"
        />
      </div>
      <div className="stats-container">
        <input
          type="number"
          value={stats.str}
          onChange={handleInputChange}
          placeholder="STR"
          name="STR"
        />
        <input
          type="number"
          value={stats.dex}
          onChange={handleInputChange}
          placeholder="DEX"
          name="DEX"
        />
        <input
          type="number"
          value={stats.con}
          onChange={handleInputChange}
          placeholder="CON"
          name="CON"
        />
        <input
          type="number"
          value={stats.int}
          onChange={handleInputChange}
          placeholder="INT"
          name="INT"
        />
        <input
          type="number"
          value={stats.wis}
          onChange={handleInputChange}
          placeholder="WIS"
          name="WIS"
        />
        <input
          type="number"
          value={stats.CHA}
          onChange={handleInputChange}
          placeholder="CHA"
          name="CHA"
        />
      </div>
      <div className="stats-container">
        <input
          type="number"
          value={stats.dodge}
          onChange={handleInputChange}
          placeholder="Dodge"
          name="dodge"
        />
        <input
          type="number"
          value={stats.initiative}
          onChange={handleInputChange}
          placeholder="Initiative"
          name="initiative"
        />
        <input
          type="number"
          value={stats.ves}
          onChange={handleInputChange}
          placeholder="VES"
          name="VES"
        />
        <input
          type="number"
          value={stats.ego}
          onChange={handleInputChange}
          placeholder="EGO"
          name="EGO"
        />
      </div>
      <div className='divider-horizontal'/>
      <input
        type="text"
        value={stats.mythosName}
        onChange={handleInputChange}
        placeholder="Mythos Name"
      />
      <input
        type="text"
        value={stats.mythosPantheon}
        onChange={handleInputChange}
        placeholder="Mythos Pantheon"
      />
      <div className="stats-container">
        <input
          type="text"
          value={stats.mythosType}
          onChange={handleInputChange}
          placeholder="Mythos Type"
        />
        <input
          type="text"
          value={stats.mythosSubtype}
          onChange={handleInputChange}
          placeholder="Mythos Subtype"
        />
      </div>
      <div className="stats-container">
        <select
          value={stats.mythosSpecialty}
          onChange={handleInputChange}
          name='mythosSpecialty'
          placeholder='Mythos Specialty'
        >
          <option value="">Specialty</option>
          <option value="Create">Create</option>
          <option value="Control">Control</option>
          <option value="Comprehend">Comprehend</option>
          <option value="Change">Change</option>
        </select>
        <select
          value={stats.mythosAffinity}
          onChange={handleInputChange}
          name='mythosAffinity'
          placeholder='Mythos Affinity'
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
          value={stats.mythosArcana}
          onChange={handleInputChange}
          name='mythosArcana'
          placeholder='Mythos Arcana'
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
    </div>
  );
};

export default CharacterNotes;
