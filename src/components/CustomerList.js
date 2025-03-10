import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CustomerList.css'; 

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    customer_id: '',
    first_name: '',
    last_name: '',
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { customer_id, first_name, last_name } = filters;
        const response = await axios.get('http://localhost:3000/api/customers', {
          params: { customer_id, first_name, last_name },
        });
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
        setError('Error fetching customers');
      }
    };

    fetchCustomers();
  }, [filters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleDelete = async (customer_id) => {
    const confirmDelete = window.confirm("You are about to delete a customer, are you sure?");
    if (!confirmDelete) return;
    
    try {
      await axios.delete(`http://localhost:3000/api/customers/${customer_id}`);
      setCustomers(customers.filter(customer => customer.customer_id !== customer_id));
    } catch (error) {
      console.error('Error deleting customer:', error);
      setError('Error deleting customer');
    }
  };

  return (
    <div>
      <h1 className="head">Customer List</h1>

      <div className="add-customer-button-container">
        <Link to="/add-customer">
          <button className="add-customer-button">Add Customer</button>
        </Link>
      </div>

      <div>
        <input
          type="text"
          name="customer_id"
          value={filters.customer_id}
          placeholder="Customer ID"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="first_name"
          value={filters.first_name}
          placeholder="First Name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="last_name"
          value={filters.last_name}
          placeholder="Last Name"
          onChange={handleInputChange}
        />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {customers.length > 0 ? (
        <ul>
          {customers.map((customer) => (
            <li key={customer.customer_id} style={{ marginBottom: '10px' }}>
              <Link className="customer-link" to={`/customers/${customer.customer_id}`}>
                {customer.first_name} {customer.last_name} (ID: {customer.customer_id})
              </Link>
              {' '}
              <Link to={`/edit-customer/${customer.customer_id}`}>
                <button className="edit-button">Edit</button>
              </Link>
              {' '}
              <button 
                className="delete-button"
                onClick={() => handleDelete(customer.customer_id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No customers found</p>
      )}
    </div>
  );
};

export default CustomerList;
