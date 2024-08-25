// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaFilm, FaShoppingCart, FaInfoCircle } from 'react-icons/fa';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/" className="navbar-link"><FaHome /> StreamList</Link></li>
        <li className="navbar-item"><Link to="/movies" className="navbar-link"><FaFilm /> Movies</Link></li>
        <li className="navbar-item"><Link to="/cart" className="navbar-link"><FaShoppingCart /> Cart</Link></li>
        <li className="navbar-item"><Link to="/about" className="navbar-link"><FaInfoCircle /> About</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
