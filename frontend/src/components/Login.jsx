import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending the POST request to login API endpoint
      const response = await axios.post('https://backend-discussion-z111.onrender.com/users/login', {
        username,
        password,
      });

      // If the response contains a token, update login state and navigate
      if (response.data.token) {
        handleLogin(true, response.data.token); // Save token and update login state
        navigate('/discussion'); // Redirect to discussion page
      } else {
        setError('Invalid credentials'); // Handle incorrect username/password
      }
    } catch (err) {
      setError('An error occurred. Please try again.'); // Handle server or network errors
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>Login</button>
      </form>
      {error && <p style={styles.error}>{error}</p>} {/* Display error message if there's an issue */}
    </div>
  );
};

// Inline styles for the component
const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    width: '200px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default Login;
