import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.navItems}>
        <Link to="/" style={styles.link}>Home</Link>
        {!isLoggedIn ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    padding: '15px',
    backgroundColor: '#007bff',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navItems: {
    display: 'flex',
    gap: '15px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
  },
  logoutButton: {
    padding: '10px 20px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Navbar;
