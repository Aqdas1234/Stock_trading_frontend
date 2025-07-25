import React, { useState, useEffect } from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import StockList from './components/StockList';
import Signup from './components/SignUp';
import Holdings from './components/Holdings';
import Login from './components/Login';
import Profile from './components/Profile';
import AddStock from './components/AddStocks';
import UserList from './components/UserList';
import TransactionHistory from './components/TransactionHistory';
import axiosInstance from './api/AxiosInstance';
import PrivateRoute from './components/PrivateRoute';
import './App.css'; 

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    // Don't call /user/me/ if token doesn't exist
    if (!token) return;


    // If token exists and valid, make API call
    axiosInstance.get('/user/me/')
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);


  return (
     <div className="app-container">
      <BrowserRouter>
      <Navbar user={user} setUser={setUser} />

        <Routes>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setUser={setUser} />} />

          <Route path="/" element={
            <PrivateRoute user={user}>
            <Home />
            </PrivateRoute>
            } />

          <Route path="/stocks" element={
            <PrivateRoute user={user}>
              <StockList />
            </PrivateRoute>
          } />

          <Route path="/profile" element={
            <PrivateRoute user={user}>
              <Profile />
            </PrivateRoute>
          } />

          <Route path="/add-stock" element={
          <PrivateRoute user={user}>
            <AddStock />
          </PrivateRoute>
          } />

          <Route path="/holdings" element={
          <PrivateRoute user={user}>
            <Holdings />
          </PrivateRoute>
          } />

          <Route path="/transactions" element={
          <PrivateRoute user={user}>
            <TransactionHistory />
          </PrivateRoute>
          } />

          <Route path="/users" element={
          <PrivateRoute user={user}>
            <UserList />
          </PrivateRoute>
          } />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
