import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // New state for success message
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('https://backend-discussion-z111.onrender.com/users/register', {
        username,
        password,
      });
      setSuccess(true); // Set success state to true
    } catch (error) {
      setError('Registration failed');
    }
  };

  const handleGoHome = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Register</h2>
        {!success ? (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            {error && <p style={styles.error}>{error}</p>}
            <button onClick={handleRegister} style={styles.button}>Register</button>
          </>
        ) : (
          <div>
            <p style={styles.successMessage}>Registration successful!</p>
            <button onClick={handleGoHome} style={styles.button}>Go to Home</button>
          </div>
        )}
      </div>
    </div>
  );
};

// Styles for the Register component
const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: ' rgb(173, 216, 230)', // Set background color
  },
  container: {
    width: '100%',
    maxWidth: '500px', // Set max width to ensure it's not too wide on larger screens
    margin: '0 auto',
    padding: '30px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(230, 217, 217, 0.1)',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    width: '100%',
    marginTop: '20px',
    transition: 'background-color 0.3s ease',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  successMessage: {
    color: 'green',
    fontSize: '1.2rem',
    marginBottom: '20px',
  },

  // Responsive styles for different screen sizes
  '@media (max-width: 1200px)': {
    container: {
      width: '90%',
      padding: '15px',
    },
    heading: {
      fontSize: '1.8rem',
    },
    button: {
      padding: '10px 20px',
      fontSize: '14px',
    },
  },
  '@media (max-width: 768px)': {
    container: {
      width: '85%',
      padding: '10px',
    },
    heading: {
      fontSize: '1.6rem',
    },
    input: {
      padding: '10px',
    },
    button: {
      padding: '8px 16px',
      fontSize: '14px',
    },
  },
  '@media (max-width: 480px)': {
    container: {
      width: '100%',
      padding: '10px',
    },
    heading: {
      fontSize: '1.4rem',
    },
    input: {
      padding: '8px',
      fontSize: '14px',
    },
    button: {
      padding: '8px 14px',
      fontSize: '14px',
    },
  },
};

export default Register;
