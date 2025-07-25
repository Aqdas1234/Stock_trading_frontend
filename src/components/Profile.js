import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../api/AxiosInstance';

const Profile = () => {
  const [user, setUser] = useState({});
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState('');

  const fetchUser = useCallback(async () => {
    try {
      const res = await axiosInstance.get('/user/me/');
      setUser(res.data);
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  }, []);

  const fetchAccount = useCallback(async () => {
    try {
      const res = await axiosInstance.get('/account/');
      setAccount(res.data);
    } catch (err) {
      setAccount(null);
    }
  }, []);

  useEffect(() => {
    fetchUser();
    fetchAccount();
  }, [fetchUser, fetchAccount]);

  const handleAddBalance = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/account/add-balance/', { balance });
      setBalance('');
      fetchAccount(); // refresh account info
    } catch (err) {
      console.error('Error adding balance:', err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h3 className="mb-3"  style={{ color: '#003366' }}>User Profile</h3>
        <p><strong>Name:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>

        <hr />

        <h5  style={{ color: '#003366' }}>Account Info</h5>
        {account ? (
          <>
            <p><strong>Current Balance:</strong> ${account.balance}</p>
            <form onSubmit={handleAddBalance}>
              <div className="mb-2">
                <label className="form-label">Add Balance</label>
                <input
                  type="number"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  className="form-control"
                  min="1"
                  required
                />
              </div>
              <button type="submit" className="btn btn-success btn-sm">Add Balance</button>
            </form>
          </>
        ) : (
          <p>No account found. Please contact support.</p>
        )}
      </div>
    </div>
  );
};


export default Profile;
