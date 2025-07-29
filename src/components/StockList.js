import React, { useState } from 'react';
import UseStocks from './UseStocks';
import axiosInstance from '../api/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/style.css';
import CustomPagination from './CustomPagination';

const StockList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { stocks, count, loading, error, refetch } = UseStocks(page);
  const [editStock, setEditStock] = useState(null);
  const [formData, setFormData] = useState({
    symbol: '',
    name: '',
    current_price: '',
    icon: null,
  });

  const handleEditClick = (stock) => {
    setEditStock(stock);
    setFormData({
      symbol: stock.symbol,
      name: stock.name,
      current_price: stock.current_price,
      icon: null,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this stock?')) return;
    try {
      await axiosInstance.delete(`/stocks/${id}/`);
      refetch(); // call the hook's refetch function
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'icon') {
      setFormData({ ...formData, icon: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdate = async () => {
    try {
      const data = new FormData();
      data.append('symbol', formData.symbol);
      data.append('name', formData.name);
      data.append('current_price', formData.current_price);
      if (formData.icon) {
        data.append('icon', formData.icon);
      }

      await axiosInstance.put(`/stocks/${editStock.id}/`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setEditStock(null);
      refetch(); // Refresh after update
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const totalPages = Math.ceil(count / 15);

  return (
    <div className="container mt-2">
      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-primary"
          onClick={() => navigate('/add-stock')}
        >
          Add New Stock
        </button>
      </div>
      <h2 className="mb-4 text-center" style={{ color: '#003366' }}>
        Stock List
      </h2>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : error ? (
        <p className="text-danger text-center">Error loading stocks</p>
      ) : (
        <>
          <table className="table custom-table shadow  text-center align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Symbol</th>
                <th>Name</th>
                <th>Icon</th>
                <th>Price ($)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr key={stock.id}>
                  <td>{stock.id}</td>
                  <td>{stock.symbol}</td>
                  <td>{stock.name}</td>
                  <td>
                    <img src={stock.icon} alt="icon" width="80" />
                  </td>
                  <td>{stock.current_price}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEditClick(stock)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(stock.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <CustomPagination page={page} totalPages={totalPages} setPage={setPage} />

        </>
      )}

      {/* Modal for Editing */}
      {editStock && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title">Edit Stock</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditStock(null)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label>Symbol</label>
                    <input
                      type="text"
                      className="form-control"
                      name="symbol"
                      value={formData.symbol}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label>New Icon (optional)</label>
                    <input
                      type="file"
                      className="form-control"
                      name="icon"
                      accept="image/*"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Current Price</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      name="current_price"
                      value={formData.current_price}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditStock(null)}
                >
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleUpdate}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockList;
