import React from 'react';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to the Discussion Forum</h1>
      <p style={styles.paragraph}>
        Engage with others, share ideas, and be part of meaningful conversations! Log in or register to get started.
      </p>
      <img 
        src="https://media.licdn.com/dms/image/v2/D5612AQETBEI6iM2CwQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1681631099901?e=2147483647&v=beta&t=yCZ-zY3mVjI7nH9ZnUl0VHsqxfzZugi0TjoJ_JWFt0Q" 
        alt="Discussion Forum"
        style={styles.image}
      />
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#add8e6'
  },
  heading: {
    fontSize: '4rem',
    color: '#333',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '30px',
    maxWidth: '800px', // Adjusted max width for larger screens
  },
  image: {
    width: '100%',  // Makes the image responsive
    maxWidth: '600px',  // Ensure the image doesn’t exceed a certain width
    height: 'auto',
    marginTop: '30px',
    borderRadius: '8px',
  },

  // Responsive Styles (Mobile-first approach)
  '@media (max-width: 1200px)': {
    heading: {
      fontSize: '2.5rem',
    },
    paragraph: {
      fontSize: '1.1rem',
    },
    image: {
      maxWidth: '500px',
    },
  },

  '@media (max-width: 1024px)': {
    heading: {
      fontSize: '2rem',
    },
    paragraph: {
      fontSize: '1rem',
    },
    image: {
      maxWidth: '450px',
    },
  },

  '@media (max-width: 768px)': {
    container: {
      marginTop: '30px',
    },
    heading: {
      fontSize: '1.5rem',
    },
    paragraph: {
      fontSize: '0.9rem',
      maxWidth: '500px',
    },
    image: {
      maxWidth: '400px',
    },
  },

  '@media (max-width: 480px)': {
    container: {
      marginTop: '20px',
      padding: '10px',
    },
    heading: {
      fontSize: '1.3rem',
    },
    paragraph: {
      fontSize: '0.85rem',
      maxWidth: '100%',
    },
    image: {
      maxWidth: '100%',
    },
  },
};

export default Home;
