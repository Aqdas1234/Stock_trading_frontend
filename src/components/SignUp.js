import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser  } from '../api/auth'; 
 
function Signup() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const isValidEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

const handleSubmit = async (e) => {
  e.preventDefault();


  if (!isValidEmail(form.email)) {
    setError('Please enter a valid email address.');
    return;
  }

  if (form.password !== form.confirmPassword) {
    setError('Passwords do not match.');
    return;
  }

  try {
        const response = await registerUser({
        username: form.username,
        email: form.email,
        password: form.password
      });

      const data = response.data;

    if (response.status === 201 || response.status === 200) {
      setSuccess('Signup successful! Redirecting to login...');
      setError('');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setError(data.error || 'Signup failed.');
      setSuccess('');
    }
  } catch (err) {
    console.error(err);
    setError('Something went wrong. Please try again.');
  }
};


  return (
    <>
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <div className="signup-card">
        <div className="card-body">
      <h4 className="card-title text-center mb-4"  style={{ color: '#003366' }}>SignUp</h4>

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
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
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

        <div className="mb-3">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Signup
        </button>
      </form>
    </div>
    </div>
    </div>  
    </>
  );
}

export default Signup;
