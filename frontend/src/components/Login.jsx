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
      // Send the POST request with username and password
      const response = await axios.post('https://backend-discussion-z111.onrender.com/users/login', {
        username,
        password,
      });

      // Check if the response contains a token
      if (response.data.token) {
        // Save the token to localStorage for persistence
        localStorage.setItem('authToken', response.data.token);

        // Notify parent component of successful login
        handleLogin(true, response.data.token);

        // Navigate to the Discussion page
        navigate('/discussion');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
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
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '10px',
    backgroundColor: '#add8e6', // Light blue background color
    paddingBottom: '300px',
    alignItems: 'center',
    borderRadius: '8px',
  },
  heading: {
    fontSize: '5rem',
    color: '#333',
    marginBottom: '10px',
    padding: '10px',
  
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '10px',
    padding: '15px',
     backgroundColor: '#fff',
  },
  input: {
    marginBottom: '10px',
    padding: '15px',
    width: '300px',
    borderRadius: '30px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '20px 30px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '250px',
    marginTop: '10px',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },

  // Responsive Styles (Mobile-first approach)
  '@media (max-width: 1200px)': {
    heading: {
      fontSize: '2.5rem',
    },
    input: {
      width: '220px',
    },
    button: {
      width: '220px',
    },
  },

  '@media (max-width: 1024px)': {
    heading: {
      fontSize: '2rem',
    },
    input: {
      width: '200px',
    },
    button: {
      width: '200px',
    },
  },

  '@media (max-width: 768px)': {
    container: {
      marginTop: '30px',
      padding: '15px',
    },
    heading: {
      fontSize: '1.8rem',
    },
    input: {
      width: '180px',
    },
    button: {
      width: '180px',
    },
  },

  '@media (max-width: 480px)': {
    container: {
      marginTop: '20px',
      padding: '10px',
    },
    heading: {
      fontSize: '1.5rem',
    },
    input: {
      width: '100%',
    },
    button: {
      width: '100%',
    },
  },
};

export default Login;
