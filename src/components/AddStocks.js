
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/AxiosInstance';

const AddStock = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
  symbol: '',
  name: '',
  current_price: '',
  icon: null, // add icon
  });


  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('accessToken');

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'icon') {
      setFormData((prev) => ({
        ...prev,
        icon: files[0], // store the selected file
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value.trim(),
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!token) {
      setError('You must be logged in to add stock.');
      return;
    }

    // validate icon is present
    if (!formData.icon) {
      setError('Icon is required.');
      return;
    }

    try {
      const payload = new FormData();
      payload.append('symbol', formData.symbol);
      payload.append('name', formData.name);
      payload.append('current_price', formData.current_price);
      payload.append('icon', formData.icon); // append icon

      const response = await axiosInstance.post('http://localhost:8000/stocks/', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(`Stock "${response.data.name}" added successfully.`);
      setFormData({ symbol: '', name: '', current_price: '', icon: null });
      navigate('/stocks'); // redirect to stock list
    } catch (err) {
      console.error(err);
      const errorMsg =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        'Error adding stock. Please check the data and try again.';
      setError(errorMsg);
    }
  };


  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <div className="card shadow">
        <div className="card-body">
          <h4 className="card-title text-center mb-4">Add New Stock</h4>

          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Symbol</label>
              <input
                type="text"
                className="form-control"
                name="symbol"
                value={formData.symbol}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Icon Image</label>
              <input
                type="file"
                 className="form-control"
                name="icon"
                onChange={handleChange}
                accept="image/*"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Current Price $ </label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                name="current_price"
                value={formData.current_price}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Add Stock</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStock;
