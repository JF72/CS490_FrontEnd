import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './TopActors.css';

const TopActors = () => {
  const [actors, setActors] = useState([]);
  const [error, setError] = useState('');
  const storeId = 1;

  useEffect(() => {
    const fetchTopActors = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/actors/top-actors/${storeId}`);
        setActors(response.data);
      } catch (err) {
        console.error('Error fetching top actors:', err);
        setError('Error fetching top actors');
      }
    };

    fetchTopActors();
  }, [storeId]);

  return (
    <div className="top-actors-container">
      <h1 className="head">Top 5 Actors</h1>
      {error && <p className="error">{error}</p>}
      <div className="actor-cards">
        {actors.length > 0 ? (
          actors.map(actor => (
            <div key={actor.actor_id} className="actor-card">
              <Link to={`/actors/${actor.actor_id}`} className="actor-link">
                <h2>{actor.first_name} {actor.last_name}</h2>
              </Link>
              <p><strong>Appears in:</strong> {actor.film_count} films</p>
            </div>
          ))
        ) : (
          <p>No top actors found.</p>
        )}
      </div>
    </div>
  );
};

export default TopActors;
