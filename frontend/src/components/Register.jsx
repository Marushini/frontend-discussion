import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the POST request to register the user
      const response = await axios.post('https://backend-discussion-z111.onrender.com/users/register', {
        username,
        password,
      });

      // Check if the registration was successful
      if (response.status === 201 || response.data.message === 'User registered successfully') {
        setSuccess('Registration successful! Redirecting to login...');
        setError('');
        setTimeout(() => {
          navigate('/login'); // Redirect to login page after 2 seconds
        }, 2000);
      } else {
        setError('Registration failed. Please try again.');
        setSuccess('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
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
        <button type="submit" style={styles.button}>Register</button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}
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
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  success: {
    color: 'green',
    marginTop: '10px',
  },
};

export default Register;
