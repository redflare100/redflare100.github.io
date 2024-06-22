import React, { useState, useEffect } from 'react';
import { useSocket } from '../../SocketContext';
import './Chronicler.css';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const socket = useSocket();

  useEffect(() => {
    // Load characters from local storage when the component mounts
    const savedCharacters = JSON.parse(localStorage.getItem('characters')) || [];
    setCharacters(savedCharacters);
  }, []);

  const addToCombatList = (character) => {
    if (socket) {
      console.log("Emitting character to add to combat list:", character); // Debugging log
      socket.emit('addCharacter', character);
    } else {
      console.error("Socket is not connected"); // Error log for socket connection issues
    }
  };

  const editCharacter = (character) => {
    // Implement edit functionality to modify character's stats
    // Open a modal or a separate section for editing
  };

  const confirmDelete = (character) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete ${character.name}?`);
    if (isConfirmed) {
      // Remove character from local storage
      const updatedCharacters = characters.filter((char) => char.name !== character.name);
      localStorage.setItem('characters', JSON.stringify(updatedCharacters));

      // Update characters state
      setCharacters(updatedCharacters);
    }
  };

  // Filter characters based on search term
  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='listicle'>
      <input
        type="text"
        placeholder="Search characters..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <hr className="divider-horizontal" />
      {filteredCharacters.length === 0 ? (
        <p>No characters found.</p>
      ) : (
        <ul style={{marginTop:'0px'}}>
          {filteredCharacters.map((character, index) => (
            <React.Fragment key={index}>
              <li className='character-container'style={{display: "flex", alignItems: "center",}}>
                <strong className='character-name' onClick={() => addToCombatList(character)}>{character.name}</strong>
                <button className='edit-button' onClick={() => editCharacter(character)}>Edit</button>
                <button className='delete-button' onClick={() => confirmDelete(character)}>Delete</button>
              </li>
              <hr className="divider-horizontal" />
            </React.Fragment>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CharacterList;
