import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../assets/style.css';

function Navbar({ user, setUser }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 
  const dropdownRef = useRef();  

  
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setDropdownOpen(false);
  }, [location]);

  return (

      <nav className="navbar navbar-expand-lg navbar-dark px-4" >

        <Link  className="fw-bold" to="/" style={{ fontSize: '2.5rem',color:"white", textDecoration:"none" }}>StockTrade</Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/stocks">Stocks</Link>
          </li>
           <li className="nav-item">
            <Link className="nav-link" to="/users">Users</Link>
          </li>

          {!user ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Signup</Link>
              </li>
            </>
          ) : (
            <li className="nav-item dropdown" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="nav-link dropdown-toggle btn btn-link"
                id="userDropdown"
                aria-expanded={dropdownOpen}
              >
                {user.username}
              </button>
              {dropdownOpen && (
                <ul className="dropdown-menu dropdown-menu-end show position-absolute end-0" aria-labelledby="userDropdown">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/holdings">
                      Holdings
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>

  );
}

export default Navbar;
