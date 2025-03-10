import React, { useState } from 'react';
import axios from 'axios';
import './RentFilm.css';

const RentFilm = () => {
  const [formData, setFormData] = useState({
    customer_id: '',
    inventory_id: '',
    staff_id: 1, 
    rental_date: '', 
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customer_id || !formData.inventory_id || !formData.staff_id) {
      setMessage('Please fill in Customer ID, Inventory ID, and Staff ID.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/api/rentals', formData);
      alert(response.data.message);
      setMessage(response.data.message);
      setFormData({
        customer_id: '',
        inventory_id: '',
        staff_id: 1,
        rental_date: '',
      });
    } catch (error) {
      console.error('Error renting film:', error);
      setMessage('Error renting film');
      alert('Error renting film');
    }
  };

  return (
    <div className="rent-film-container">
      <h1>Rent a Film</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Customer ID:</label>
          <input
            type="text"
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Inventory ID:</label>
          <input
            type="text"
            name="inventory_id"
            value={formData.inventory_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Staff ID:</label>
          <input
            type="text"
            name="staff_id"
            value={formData.staff_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Rental Date (optional):</label>
          <input
            type="datetime-local"
            name="rental_date"
            value={formData.rental_date}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Rent Film</button>
      </form>
    </div>
  );
};

export default RentFilm;
