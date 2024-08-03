// src/components/StreamList.js
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const StreamList = () => {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);

  const handleAdd = () => {
    if (input) {
      setList([...list, input]);
      setInput('');
      console.log('Current Stream List:', list);
    }
  };

  return (
    <div>
      <h1>My Watchlist</h1>
      <input
        type="text"
        id="stream-input"
        name="stream"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a movie"
      />
      <button onClick={handleAdd}>
        <FaPlus /> Add
      </button>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default StreamList;
