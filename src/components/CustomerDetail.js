import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CustomerDetail = () => {
  const { id } = useParams(); 
  const [customer, setCustomer] = useState(null);
  const [rentals, setRentals] = useState([]);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const customerResponse = await axios.get(`http://localhost:3000/api/customers/${id}`);
      setCustomer(customerResponse.data);
    } catch (err) {
      console.error('Error fetching customer details:', err);
      setError('Error fetching customer details');
    }
    try {
      const rentalsResponse = await axios.get(`http://localhost:3000/api/customers/${id}/rentals`);
      setRentals(rentalsResponse.data);
    } catch (err) {
      console.error('Error fetching rental history:', err);
      setError('Error fetching rental history');
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleReturnRental = async (rentalId) => {
    try {
      await axios.put(`http://localhost:3000/api/rentals/${rentalId}/return`);
      fetchData();
    } catch (error) {
      console.error('Error marking rental as returned:', error);
      setError('Error marking rental as returned');
    }
  };

  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
  if (!customer) return <p style={{ textAlign: 'center' }}>Loading customer details...</p>;

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>
        {customer.first_name} {customer.last_name}
      </h1>
      <p>Email: {customer.email}</p>

      <h2>Rental History</h2>
      {rentals.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {rentals.map((rental) => (
            <li key={rental.rental_id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
              <p>
                <strong>Film:</strong> {rental.title}
              </p>
              <p>
                <strong>Rented on:</strong> {new Date(rental.rental_date).toLocaleDateString()}
              </p>
              {rental.return_date ? (
                <p>
                  <strong>Returned on:</strong> {new Date(rental.return_date).toLocaleDateString()}
                </p>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <p>
                    <strong>Status:</strong> {rental.rental_status}
                  </p>
                  <button onClick={() => handleReturnRental(rental.rental_id)}>
                    Mark as Returned
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No rental history for this customer.</p>
      )}
    </div>
  );
};

export default CustomerDetail;
