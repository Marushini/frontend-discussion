import axios from 'axios';

// Define the base URL for the backend API
const BASE_URL = "https://backend-discussion-2.onrender.com/api"; // Replace with your backend URL

// Login API request
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, {
      username,
      password,
    });
    return response.data; // Return the token or any response from the backend
  } catch (error) {
    console.error("Login failed:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Create a new discussion
export const createDiscussion = async (token, content) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/discussions`, 
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Return the response from the server
  } catch (error) {
    console.error("Error creating discussion:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Get all discussions
export const getDiscussions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/discussions`);
    return response.data; // Return the discussions
  } catch (error) {
    console.error("Error fetching discussions:", error.response ? error.response.data : error.message);
    throw error;
  }
};
