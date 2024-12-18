import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.navItems}>
        <Link to="/" style={styles.logo}>
          <img src="https://via.placeholder.com/100" alt="Logo" style={styles.logoImg} />
          <span style={styles.logoText}>Discussion Forum</span>
        </Link>
        <div style={styles.linksContainer}>
          <Link to="/" style={styles.link}>Home</Link>
          {!isLoggedIn ? (
            <>
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/register" style={styles.link}>Register</Link>
              <Link to="/discussion" style={styles.link}>Discussion</Link>
            </>
          ) : (
            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    position: 'fixed',  // Fix the navbar to the top
    top: 0,  // Ensure it stays at the top
    left: 0,
    width: '100%',  // Ensure it spans the full width of the page
    padding: '15px 20px',
    backgroundColor: '#0069d9',  // A deeper blue for better contrast
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,  // Ensure it stays on top of other content
    boxSizing: 'border-box',
  },
  navItems: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1200px',  // Max width to avoid overly stretched nav on large screens
    margin: '0 auto',  // Center the navbar content
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    marginRight: 'auto',  // Push the links to the right side
  },
  logoImg: {
    width: '40px',
    height: '40px',
    marginRight: '10px',
  },
  logoText: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
  },
  linksContainer: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
    transition: 'color 0.3s',
    whiteSpace: 'nowrap',  // Prevent text from wrapping
  },
  logoutButton: {
    padding: '8px 20px',
    backgroundColor: '#d9534f',  // Bootstrap red for logout button
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '16px',
  },
};

export default Navbar;
