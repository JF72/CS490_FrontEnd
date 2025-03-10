import React, { useState } from 'react';
import axios from 'axios';
import './AddCustomer.css';

const AddCustomer = () => {
  const [customerData, setCustomerData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    store_id: '1',
    address_id: '1',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/customers', customerData);
      alert(response.data.message); 
      setMessage(response.data.message);
      setCustomerData({
        first_name: '',
        last_name: '',
        email: '',
        store_id: '1',
        address_id: '1',
      });
    } catch (error) {
      console.error('Error adding customer:', error);
      setMessage('Error adding customer');
      alert('Error adding customer');
    }
  };

  return (
    <div className="add-customer-container">
      <h1>Add Customer</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={customerData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={customerData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={customerData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <select name="store_id" value={customerData.store_id} onChange={handleChange} required>
            <option value="1">Store 1</option>
            <option value="2">Store 2</option>
          </select>
        </div>
        <div>
          <select name="address_id" value={customerData.address_id} onChange={handleChange} required>
            <option value="1">Address 1</option>
            <option value="2">Address 2</option>
          </select>
        </div>
        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
};

export default AddCustomer;
