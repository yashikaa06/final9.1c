import React from 'react';
import { Input, Button } from 'semantic-ui-react';
import './Navbar.css';

const Navbar = ({ user, onLogin, onLogout, onPost }) => {
  return (
    <div className="navbar">
      {/* Title */}
      <div className="navbar-title">
        <h3>Dev@Deakin</h3>
      </div>

      {/* Search Bar */}
      <div className="navbar-search">
        <Input icon="search" placeholder="Search..." fluid />
      </div>

      {/* Buttons */}
      <div className="navbar-buttons">
        <Button className="custom-button" onClick={onPost}>
          Post
        </Button>
        {user ? (
          <Button className="custom-button" color="red" onClick={onLogout}>
            Logout
          </Button>
        ) : (
          <Button className="custom-button" color="green" onClick={onLogin}>
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
