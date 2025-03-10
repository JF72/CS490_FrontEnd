import React from 'react';
import FilmSlideshow from './FilmSlideshow';
import './LandingPage.css';
const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="intro">
        <h2>Welcome to Sakila Movies</h2>
        <p>Your gateway to classic and contemporary films.</p>
      </div>
      <div className="content">
        <p>Explore our extensive collection, search for your favorite films, and discover top rented movies and actors.</p>
      </div>
      <div className="slideshow-container">
        <FilmSlideshow />
      </div>
  
    </div>
  );
};

export default LandingPage;
