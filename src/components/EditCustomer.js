import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './CustomerForm.css'; 

const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    first_name: '',
    last_name: '',
    email: '',
    store_id: '1',
    address_id: '1',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/customers/${id}`);
        setCustomer(response.data);
      } catch (err) {
        console.error("Error fetching customer details:", err);
        setError("Error fetching customer details");
      }
    };

    if (id) {
      fetchCustomer();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/customers/${id}`, customer);
      navigate('/customers')
    } catch (err) {
      console.error("Error updating customer:", err);
      setError("Error updating customer");
    }
  };

  return (
    <div className="customer-form-container">
      <h1>Edit Customer</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={customer.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={customer.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={customer.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Store ID:</label>
          <select name="store_id" value={customer.store_id} onChange={handleChange} required>
            <option value="1">Store 1</option>
            <option value="2">Store 2</option>
          </select>
        </div>
        <div>
          <label>Address ID:</label>
          <select name="address_id" value={customer.address_id} onChange={handleChange} required>
            <option value="1">Address 1</option>
            <option value="2">Address 2</option>
          </select>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditCustomer;
