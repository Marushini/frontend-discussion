import React, { useState, useEffect } from 'react';

const Discussion = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', description: '' });
  const [newReply, setNewReply] = useState({ replyText: '', postId: '' });
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

    const username = localStorage.getItem('username');
    if (!username) {
      setError('You must be logged in to post');
      return;
    }

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
          createdBy: username,
        }),
      });
      setNewPost({ title: '', description: '' });
      fetchPosts();
    } catch (err) {
      setError('Failed to post');
    }
  };

  // Submit a reply to a post
  const handleReplySubmit = async (e, postId) => {
    e.preventDefault();

    const username = localStorage.getItem('username');
    if (!username) {
      setError('You must be logged in to reply');
      return;
    }

    try {
      await fetch(`https://backend-discussion-z111.onrender.com/api/discussion/${postId}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          replyText: newReply.replyText,
          repliedBy: username,
        }),
      });
      setNewReply({ replyText: '', postId: '' });
      fetchPosts();
    } catch (err) {
      setError('Failed to post reply');
    }
  };

  // Handle like and dislike
  const handleVote = async (postId, type) => {
    const response = await fetch(`https://backend-discussion-z111.onrender.com/api/discussion/${postId}/${type}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const updatedPost = await response.json();
    setPosts(posts.map(post => post._id === postId ? updatedPost : post));
  };

  // Handle login (for saving username in localStorage)
  const handleLogin = async (username, password) => {
    const response = await fetch('https://backend-discussion-z111.onrender.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      // Save username to localStorage upon successful login
      localStorage.setItem('username', data.username);
      setError('');  // Clear error if login is successful
      // Optionally, redirect or update state for logged-in user
    } else {
      setError('Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Discussion Forum</h1>
      {/* Post submission form */}
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
                onClick={() => handleVote(post._id, 'like')}
                style={styles.likeButton}
              >
                👍 Like ({post.likeCount})
              </button>
              <button
                onClick={() => handleVote(post._id, 'dislike')}
                style={styles.button}
              >
                👎 Dislike ({post.dislikeCount})
              </button>
            </div>

            {/* Reply button */}
            <button 
              onClick={() => setNewReply({ ...newReply, postId: post._id })} 
              style={styles.replyButton}
            >
              Reply
            </button>

            {/* Reply form */}
            {newReply.postId === post._id && (
              <form onSubmit={(e) => handleReplySubmit(e, post._id)} style={styles.replyForm}>
                <textarea
                  value={newReply.replyText}
                  onChange={(e) => setNewReply({ ...newReply, replyText: e.target.value })}
                  placeholder="Write your reply"
                  style={styles.textarea}
                />
                <button type="submit" style={styles.button}>Submit Reply</button>
              </form>
            )}

            {/* Display all replies */}
            <div style={styles.replies}>
              {post.replies && post.replies.length > 0 && <h4>Replies:</h4>}
              {post.replies && post.replies.map((reply, index) => (
                <div key={index} style={styles.reply}>
                  <p><strong>{reply.repliedBy}</strong>: {reply.replyText}</p>
                </div>
              ))}
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
    marginTop: '70px',
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
  replyButton: {
    padding: '10px 15px',
    backgroundColor: '#f0ad4e',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '10px',
  },
  replyForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '10px',
  },
  replies: {
    marginTop: '20px',
    paddingLeft: '20px',
  },
  reply: {
    backgroundColor: '#f9f9f9',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
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
