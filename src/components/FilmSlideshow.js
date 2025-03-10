import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './FilmSlideshow.css';

const FilmSlideshow = () => {
    const films = [
        { id: 1, image: '/BUCKET BROTHERHOOD.webp', title: 'Bucket Brotherhood' },
        { id: 2, image: '/JUGGLER HARDLY.webp', title: 'Juggler Hardly' },
        { id: 3, image: '/RIDGEMONT SUBMARINE.webp', title: 'Ridgemont Submarine' },
        { id: 4, image: '/ROCKETEER MOTHER.webp', title: 'Rocketeer Mother' },
        { id: 5, image: '/SCALAWAG DUCK.webp', title: 'Scalawag Duck' },
    ];

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="film-slideshow">
      <Slider {...settings}>
        {films.map(film => (
          <div key={film.id} className="slide">
            <Link to={`/films/${film.id}`}>
              <img src={film.image} alt={film.title} />
            </Link>
            <div className="caption">{film.title}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FilmSlideshow;
