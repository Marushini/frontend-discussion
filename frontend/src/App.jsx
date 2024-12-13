import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Discussion from './components/Discussion';
import Navbar from './components/Navbar';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setIsLoggedIn(true);
      setToken(savedToken);
    }
  }, []);

  const handleLogin = (status, token) => {
    setIsLoggedIn(status);
    setToken(token);
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/discussion" /> : <Login handleLogin={handleLogin} />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/discussion"
          element={isLoggedIn ? <Discussion token={token} /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
