import React from 'react';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to the Discussion Forum</h1>
      <p>Join the conversation! Login or Register to get started.</p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
};

export default Home;
