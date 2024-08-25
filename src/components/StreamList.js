import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import './StreamList.css'; 

const StreamList = () => {
  const [input, setInput] = useState('');
  const [type, setType] = useState('Movie');
  const [list, setList] = useState(() => {
    const storedList = JSON.parse(localStorage.getItem('streamList'));
    return storedList ? storedList : [];
  });

  // Save list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('streamList', JSON.stringify(list));
  }, [list]);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [editingType, setEditingType] = useState('Movie');

  const handleAdd = () => {
    if (input) {
      setList([...list, { text: input, type, watched: false }]);
      setInput('');
      setType('Movie');
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingText(list[index].text);
    setEditingType(list[index].type);
  };

  const handleSave = (index) => {
    setList(list.map((item, i) => 
      i === index ? { ...item, text: editingText, type: editingType } : item
    ));
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  const handleWatchToggle = (index) => {
    setList(list.map((item, i) => 
      i === index ? { ...item, watched: !item.watched } : item
    ));
  };

  return (
    <div className="stream-list">
      <h1>StreamList</h1>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a movie or show"
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Movie">Movie</option>
          <option value="Show">Show</option>
        </select>
        <button onClick={handleAdd}>Add</button>
      </div>
      <ul className="list-container">
        {list.map((item, index) => (
          <li key={index} className="list-item">
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <select value={editingType} onChange={(e) => setEditingType(e.target.value)}>
                  <option value="Movie">Movie</option>
                  <option value="Show">Show</option>
                </select>
                <button onClick={() => handleSave(index)}>Save</button>
              </>
            ) : (
              <>
                <span>{item.text} ({item.type}) {item.watched && "(Watched)"}</span>
                <div className="action-buttons">
                  <button onClick={() => handleEdit(index)}><FaEdit /></button>
                  <button onClick={() => handleDelete(index)}><FaTrash /></button>
                  <button onClick={() => handleWatchToggle(index)}><FaCheck /></button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StreamList;
