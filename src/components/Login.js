import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth'; 
import axiosInstance from '../api/AxiosInstance';


function Login({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(form);

      if (data.access) {
        localStorage.setItem('accessToken', data.access);

        const userRes = await axiosInstance.get('/user/me/');
        setSuccess('Login successful! Redirecting to home...');
        setError('');
        setUser(userRes.data);
        navigate('/');
      } else {
        setError(data.detail || 'Login failed');
        setSuccess('');
      }
    } catch (err) {
      setError('Something went wrong.');
      console.error(err);
      setSuccess('');
    }
  };

  return (
    <>
        <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <div className="login-card">
        <div className="card-body">
      <h4 className="card-title text-center mb-4"  style={{ color: '#003366' }}>Login</h4>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
        </div>
        </div>
        </>
  );
}

export default Login;
