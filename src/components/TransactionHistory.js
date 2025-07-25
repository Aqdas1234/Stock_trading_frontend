// TransactionHistory.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/AxiosInstance'; 
import {  Table, Spinner } from 'react-bootstrap';
import '../assets/style.css';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axiosInstance.get('/transactions/'); 
        setTransactions(res.data.results);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4" style={{ color: '#003366' }}>Transaction History</h2>
        <Table   hover responsive className="table custom-table text-center align-middle">
          <thead>
            <tr>
              <th>Type</th>
              <th>Status</th>
              <th>Quantity</th>
              <th>Price/Stock</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(txn => (
              <tr key={txn.id}>
                
                <td>{txn.transaction_type}</td>
                <td>{txn.status}</td>
                <td>{txn.quantity}</td>
                <td>${txn.price_per_stock}</td>
                <td>{new Date(txn.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
     
    </div>
  );
};

export default TransactionHistory;
