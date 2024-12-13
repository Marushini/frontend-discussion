import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Discussion = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', description: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch existing posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://backend-discussion-z111.onrender.com/api/discussions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(response.data);
    } catch (err) {
      setError('Failed to load posts');
    }
  };

  // Submit a new post
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'https://backend-discussion-z111.onrender.com/api/discussion',
        {
          title: newPost.title,
          description: newPost.description,
          createdBy: 'user', // Use actual user data if available
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewPost({ title: '', description: '' }); // Clear the form
      fetchPosts();
    } catch (err) {
      setError('Failed to post');
    }
  };

  // Handle like button click
  const handleLike = async (postId) => {
    try {
      await axios.post(
        `https://backend-discussion-z111.onrender.com/api/discussion/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPosts();
    } catch (err) {
      setError('Failed to like post');
    }
  };

  // Handle dislike button click
  const handleDislike = async (postId) => {
    try {
      await axios.post(
        `https://backend-discussion-z111.onrender.com/api/discussion/${postId}/dislike`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPosts();
    } catch (err) {
      setError('Failed to dislike post');
    }
  };

  return (
    <div>
      <h1>Discussion Forum</h1>
      <form onSubmit={handlePostSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          style={styles.input}
        />
        <textarea
          value={newPost.description}
          onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
          placeholder="Write a new post"
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>Post</button>
      </form>

      {error && <p style={styles.error}>{error}</p>}

      <div>
        {posts.map((post) => (
          <div key={post._id} style={styles.post}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <p>Created by: {post.createdBy}</p>
            <button onClick={() => handleLike(post._id)} style={styles.likeButton}>👍 Like</button>
            <button onClick={() => handleDislike(post._id)} style={styles.button}>👎 Dislike</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '10px',
    marginBottom: '10px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    marginTop: '10px',
  },
  likeButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    marginTop: '10px',
  },
  post: {
    borderBottom: '1px solid #ccc',
    padding: '10px',
    marginBottom: '10px',
  },
  error: {
    color: 'red',
  },
};

export default Discussion;
