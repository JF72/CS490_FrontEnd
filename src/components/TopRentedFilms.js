import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './TopRentedFilms.css';

const TopRentedFilms = () => {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTopRentedFilms = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/films/top-rented');
        setFilms(response.data);
      } catch (err) {
        console.error('Error fetching top rented films:', err);
        setError('Error fetching top rented films');
      }
    };

    fetchTopRentedFilms();
  }, []);

  return (
    <div className="top-films-container">
      <h1>Top 5 Rented Films</h1>
      {error && <p className="error">{error}</p>}
      <div className="film-cards">
        {films.map((film) => (
          <div key={film.film_id} className="film-card">
            <Link to={`/films/${film.film_id}`} className="film-link">
              <h2>{film.title}</h2>
            </Link>
            <p>{film.description}</p>
            <p><strong>Rented:</strong> {film.rental_count} times</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRentedFilms;
