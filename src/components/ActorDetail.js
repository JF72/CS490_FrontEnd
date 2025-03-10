import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './ActorDetail.css';

const ActorDetail = () => {
  const { id } = useParams(); 
  const [actor, setActor] = useState(null);
  const [topFilms, setTopFilms] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/actors/${id}`);
        setActor(response.data);
      } catch (error) {
        console.error('Error fetching actor details:', error);
        setError('Error fetching actor details');
      }
    };

    const fetchTopFilms = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/actors/${id}/top-films`);
        setTopFilms(response.data);
      } catch (error) {
        console.error('Error fetching top films for actor:', error);
        setError('Error fetching top films');
      }
    };

    fetchActorDetails();
    fetchTopFilms();
  }, [id]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!actor) return <p>Loading actor details...</p>;

  return (
    <div className="actor-detail">
      <h1>
        {actor.first_name} {actor.last_name}
      </h1>
      <h2>Top 5 Rented Films Featuring This Actor</h2>
      {topFilms.length > 0 ? (
        <ul>
          {topFilms.map(film => (
            <li key={film.film_id}>
              <Link to={`/films/${film.film_id}`}>
                {film.title}
              </Link> – Rented {film.rental_count} times
            </li>
          ))}
        </ul>
      ) : (
        <p>No films found for this actor.</p>
      )}
    </div>
  );
};

export default ActorDetail;
