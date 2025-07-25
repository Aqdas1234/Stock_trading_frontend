
import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/AxiosInstance'; 
import TransactionHistory from './TransactionHistory';

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const response = await axiosInstance.get('/holdings/'); 
        setHoldings(response.data.results);
      } catch (error) {
        console.error('Error fetching holdings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHoldings();
  }, []);

  return (
    <>
    <div className="container mt-4">
      <h2 className="text-center mb-4" style={{ color: '#003366' }}>Your Holdings</h2>

      {loading ? (
        <p>Loading...</p>
      ) : holdings.length === 0 ? (
        <p>You currently have no holdings.</p>
      ) : (
        <table className="table custom-table text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>Stock Symbol</th>
              <th>Stock Name</th>
              <th>Current Price</th>
              <th>Holding Quantity</th>
              <th>Total Value</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((holding) => (
              <tr key={holding.id}>
                <td>{holding.stock.symbol}</td>
                <td>{holding.stock.name}</td>
                <td>${holding.stock.current_price}</td>
                <td>{holding.quantity}</td>
                <td>${(holding.stock.current_price * holding.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    
    <TransactionHistory/>

    </>
  );
};

export default Holdings;
