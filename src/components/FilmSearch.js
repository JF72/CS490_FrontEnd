import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './FilmSearch.css';

const FilmSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [films, setFilms] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      setError('Please enter a search term');
      return;
    }
  
    setFilms([]);
    setError('');
  
    try {
      const response = await axios.get(`http://localhost:3000/api/films/search?query=${searchQuery}`);
      if (response.data.length > 0) {
        const uniqueFilms = response.data.filter((value, index, self) =>
          index === self.findIndex((t) => t.film_id === value.film_id)
        );
        setFilms(uniqueFilms);
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
    <div className="film-search-container">
      <h1>Film Search</h1>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/top-rented-films">
          <button className="top-films-button">View Top 5 Films</button>
        </Link>
      </div>
      <input 
        type="text" 
        placeholder="Search for films, actors, or genres" 
        value={searchQuery} 
        onChange={handleInputChange} 
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p>{error}</p>}

      {films.length > 0 ? (
        <ul>
          {films.map((film) => (
            <li key={film.film_id}>
              <Link to={`/films/${film.film_id}`}>
                <strong>{film.title}</strong> - {film.description}
              </Link>
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
