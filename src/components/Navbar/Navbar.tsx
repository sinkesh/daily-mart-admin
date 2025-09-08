import React from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <div>Admin Panel</div>
      <button className="logout-btn">Logout</button>
    </div>
  );
};

export default Navbar;
