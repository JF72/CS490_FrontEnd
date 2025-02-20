import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  // Import Router, Routes, and Link for navigation
import CustomerList from './components/CustomerList';  // Import CustomerList component
import FilmSearch from './components/FilmSearch';      // Import FilmSearch component
import LandingPage from './components/LandingPage';    // Import LandingPage component

function App() {
  return (
    <div className="App">
      <Router>
        <h1>Welcome to Customer Management</h1>
        
        {/* Navigation Links */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link> {/* Link to the Landing Page */}
            </li>
            <li>
              <Link to="/customers">Customer List</Link>
            </li>
            <li>
              <Link to="/film-search">Film Search</Link>
            </li>
          </ul>
        </nav>

        {/* Define routes for Customer List, Film Search, and Landing Page */}
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* This is the Landing Page route */}
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/film-search" element={<FilmSearch />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
