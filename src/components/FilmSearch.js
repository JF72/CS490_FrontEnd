import React, { useState } from 'react';
import axios from 'axios';

const FilmSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [films, setFilms] = useState([]);
  const [error, setError] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search button click
  const handleSearch = async () => {
    if (!searchQuery) {
      setError('Please enter a search term');
      return;
    }
  
    // Clear previous error and films
    setFilms([]);
    setError('');
  
    try {
      // Make the API request to the backend
      const response = await axios.get(`http://localhost:3008/api/films/search?query=${searchQuery}`);
  
      if (response.data.length > 0) {
        setFilms(response.data);  // Set films if data is returned
      } else {
        setFilms([]);
        setError('No films found');
      }
    } catch (error) {
      console.error('Error fetching films:', error);
      setError('Error fetching films');
    }
  };
  

  return (
    <div>
      <h1>Film Search</h1>
      <input 
        type="text" 
        placeholder="Search for films, actors, or genres" 
        value={searchQuery} 
        onChange={handleInputChange} 
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p>{error}</p>}

      {/* Display films if there are any */}
      {films.length > 0 ? (
        <ul>
          {films.map((film) => (
            <li key={film.film_id}>
              <strong>{film.title}</strong> - {film.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No films found</p>
      )}
    </div>
  );
};

export default FilmSearch;
