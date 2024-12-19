import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Discussion = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', description: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch all discussions
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://backend-discussion-z111.onrender.com/api/discussions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(response.data);
    } catch (err) {
      setError('Failed to fetch discussions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle new post submission
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://backend-discussion-z111.onrender.com/api/discussions',
        newPost,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setPosts([response.data, ...posts]);
      setNewPost({ title: '', description: '' });
    } catch (err) {
      setError('Failed to create a new discussion.');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Discussion Board</h2>
      <form onSubmit={handlePostSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          style={styles.input}
          required
        />
        <textarea
          placeholder="Description"
          value={newPost.description}
          onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
          style={styles.textarea}
          required
        />
        <button type="submit" style={styles.button}>Post</button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      {loading ? (
        <p>Loading discussions...</p>
      ) : (
        <div style={styles.postList}>
          {posts.map((post) => (
            <div key={post._id} style={styles.post}>
              <h3 style={styles.postTitle}>{post.title}</h3>
              <p style={styles.postDescription}>{post.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  form: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    height: '100px',
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
    marginBottom: '20px',
  },
  postList: {
    marginTop: '20px',
  },
  post: {
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: 'white',
  },
  postTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  postDescription: {
    marginTop: '5px',
  },
};

export default Discussion;
