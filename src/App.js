import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import FilmSearch from './components/FilmSearch';
import FilmDetail from './components/FilmDetail';
import CustomerList from './components/CustomerList';
import AddCustomer from './components/AddCustomer';
import TopRentedFilms from './components/TopRentedFilms';
import TopActors from './components/TopActors';
import ActorDetail from './components/ActorDetail';
import RentFilm from './components/RentFilm';
import CustomerDetail from './components/CustomerDetail';
import EditCustomer from './components/EditCustomer';
import SplashScreen from './components/SplashScreen';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1280);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <div className="App">
      <Router>
        <header className="app-header">
          <Link to="/" className="logo-link">
            <img src="/logo.png" alt="Sakila Movies Logo" className="logo" />
          </Link>
          <h1>Welcome to Sakila Movies</h1>
        </header>
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/film-search">Film Search</Link>
          <Link to="/top-actors">Top 5 Actors</Link>
          <Link to="/customers">Customer List</Link>
          <Link to="/rent-film">Rent Film</Link>
        </nav>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/film-search" element={<FilmSearch />} />
          <Route path="/films/:film_id" element={<FilmDetail />} />
          <Route path="/top-rented-films" element={<TopRentedFilms />} />
          <Route path="/top-actors" element={<TopActors />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/actors/:id" element={<ActorDetail />} />
          <Route path="/customers/:id" element={<CustomerDetail />} />
          <Route path="/edit-customer/:id" element={<EditCustomer />} />
          <Route path="/rent-film" element={<RentFilm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
