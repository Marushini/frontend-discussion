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
      // Replace with your actual login API endpoint
      const response = await axios.post('https://backend-discussion-z111.onrender.com/users/login', {
        username,
        password,
      });

      // Assuming the response contains a token
      if (response.data.token) {
        handleLogin(true, response.data.token);
        navigate('/discussion');  // Redirect to the Discussion page after successful login
      } else {
        setError('Invalid credentials'); // Display error message for invalid credentials
      }
    } catch (err) {
      setError('An error occurred. Please try again.'); // Handle any other errors
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
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Login</button>
      </form>
      {error && <p style={styles.error}>{error}</p>} {/* Show error message if credentials are incorrect */}
    </div>
  );
};

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
  },
  error: {
    color: 'red',
  },
};

export default Login;
