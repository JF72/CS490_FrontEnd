import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  
import axios from 'axios';
import './FilmDetail.css'; 

const FilmDetail = () => {
  const { film_id } = useParams();
  const [film, setFilm] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/films/${film_id}`);
        setFilm(response.data);  
      } catch (error) {
        console.error('Error fetching film details:', error);
        setError('Error fetching film details');
      }
    };

    fetchFilmDetails();
  }, [film_id]);

  if (error) {
    return <div className="film-detail">{error}</div>;
  }

  if (!film) {
    return <div className="film-detail">Loading...</div>;
  }

  return (
    <div className="film-detail">
      <h1>{film.title}</h1>
      <p><strong>Description:</strong> {film.description}</p>
      <p><strong>Release Year:</strong> {film.release_year}</p>
      <p><strong>Rating:</strong> {film.rating}</p>
      <p><strong>Genres:</strong> {film.genres}</p>
    </div>
  );
};

export default FilmDetail;
