import React, { useState, useEffect } from 'react';
import { Container, Segment, Image } from 'semantic-ui-react';
import Navbar from './Navbar'; // Import Navbar component
import { auth } from './utils/firebase';
import Login from './Login';
import SignUp from './SignUp';
import homepageImage from './source/image.png'; // Replace with your image path

const App = () => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false); // Control login popup
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const toggleAuthMode = () => {
    setShowSignUp(!showSignUp);
  };

  const handleLogin = () => {
    setShowLogin(true); // Show login modal
  };

  const handlePost = () => {
    console.log('Post functionality goes here');
  };

  const handleLogout = () => {
    auth.signOut()
      .then(() => console.log('User logged out'))
      .catch((error) => console.error('Logout error:', error));
  };

  return (
    <>
      {/* Navbar */}
      <Navbar user={user} onLogin={handleLogin} onLogout={handleLogout} onPost={handlePost} />
      <div>
        {/* Main Content */}
        <Container style={{ marginTop: '20px' }}>
          {user ? (
            <Segment>
              <h2>Welcome, {user.email}</h2>
            </Segment>
          ) : (
            <>
              {!showLogin && (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                  <Image
                    src={homepageImage}
                    size="large"
                    centered
                    alt="Welcome to the homepage"
                    style={{ borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }}
                  />
                  <h1 style={{ marginTop: '20px', color: '#333' }}>Welcome to Dev@Deakin</h1>
                </div>
              )}
              {showLogin && (
                <Segment>
                  {showSignUp ? (
                    <>
                      <SignUp onSignUp={() => console.log('Signed up')} />
                      <button onClick={toggleAuthMode} style={{backgroundColor:'white'}}>Already have an account? Login</button>
                    </>
                  ) : (
                    <>
                      <Login onLogin={() => console.log('Logged in')} />
                      <button onClick={toggleAuthMode}>Don't have an account? Sign Up</button>
                    </>
                  )}
                </Segment>
              )}
            </>
          )}
        </Container>
      </div>
    </>
  );
};

export default App;