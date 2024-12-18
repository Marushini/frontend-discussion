import React, { useState, useEffect } from 'react';

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
      const response = await fetch('https://backend-discussion-z111.onrender.com/api/discussions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError('Failed to load posts');
    }
  };

  // Submit a new post
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('https://backend-discussion-z111.onrender.com/api/discussion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newPost.title,
          description: newPost.description,
          createdBy: 'user', // Use actual user data if available
        }),
      });
      setNewPost({ title: '', description: '' }); // Clear the form
      fetchPosts(); // Refresh posts
    } catch (err) {
      setError('Failed to post');
    }
  };

  // Handle like button click
  const handleLike = (postId) => {
    setPosts(posts.map(post =>
      post._id === postId ? { ...post, likeCount: post.likeCount + 1 } : post
    ));
  };

  // Handle dislike button click
  const handleDislike = (postId) => {
    setPosts(posts.map(post =>
      post._id === postId ? { ...post, dislikeCount: post.dislikeCount + 1 } : post
    ));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Discussion Forum</h1>
      <form onSubmit={handlePostSubmit} style={styles.form}>
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

      <div style={styles.postsContainer}>
        {posts.map((post) => (
          <div key={post._id} style={styles.post}>
            <h3 style={styles.postTitle}>{post.title}</h3>
            <p>{post.description}</p>
            <p style={styles.createdBy}>Created by: {post.createdBy}</p>
            <div style={styles.actions}>
              <button
                onClick={() => handleLike(post._id)}
                style={styles.likeButton}
              >
                👍 Like ({post.likeCount})
              </button>
              <button
                onClick={() => handleDislike(post._id)}
                style={styles.button}
              >
                👎 Dislike ({post.dislikeCount})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#add8e6', // Blue background color
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    marginTop: '70px', // To prevent content from being hidden behind navbar
  },
  title: {
    textAlign: 'center',
    color: '#000', // Text color for contrast on blue background
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '30px',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  button: {
    padding: '12px 20px',
    backgroundColor: '#007bff', // Blue button color to match background
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  likeButton: {
    padding: '12px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  post: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  postTitle: {
    color: '#333',
    fontSize: '1.2rem',
    marginBottom: '10px',
  },
  createdBy: {
    fontStyle: 'italic',
    color: '#666',
    marginTop: '10px',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: '20px',
  },
  postsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
};

export default Discussion;
