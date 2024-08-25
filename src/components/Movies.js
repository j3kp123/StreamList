import React, { useState, useEffect } from 'react';
import { searchMovies } from './tmdbService';
import './Movies.css';

const Movies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem('searchResults');
    return savedMovies ? JSON.parse(savedMovies) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [streamList, setStreamList] = useState(() => {
    const savedStreamList = localStorage.getItem('streamList');
    return savedStreamList ? JSON.parse(savedStreamList) : [];
  });
  const [confirmation, setConfirmation] = useState(false); // State for confirmation message

  useEffect(() => {
    localStorage.setItem('searchResults', JSON.stringify(movies));
  }, [movies]);

  useEffect(() => {
    localStorage.setItem('streamList', JSON.stringify(streamList));
  }, [streamList]);

  const handleSearch = async () => {
    if (query.trim() === '') return;
    setLoading(true);
    setError('');
    try {
      const results = await searchMovies(query);
      if (results.length === 0) {
        setError('No movies found.');
      }
      setMovies(results);
    } catch (error) {
      setError('Failed to fetch movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const addToStreamList = (movie) => {
    const newItem = {
      text: movie.title,
      type: 'Movie', // Assuming the search results are for movies
      watched: false,
    };

    if (!streamList.some(item => item.text === newItem.text && item.type === newItem.type)) {
      const updatedStreamList = [...streamList, newItem];
      setStreamList(updatedStreamList);
      setConfirmation(true); // Show confirmation message

      // Hide the confirmation message after 2 seconds
      setTimeout(() => {
        setConfirmation(false);
      }, 2000);
    } else {
      alert("This movie is already in your StreamList.");
    }
  };

  return (
    <div className="movies-container">
      <h1>Movies</h1>
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for a movie..."
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {confirmation && (
        <div className="confirmation-message">
          Movie added to StreamList!
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <strong>{movie.title}</strong> ({movie.release_date ? movie.release_date.split('-')[0] : 'N/A'})
            <p>{movie.overview ? movie.overview : 'No description available.'}</p>
            <button onClick={() => addToStreamList(movie)} className="add-button">
              Add to StreamList
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
