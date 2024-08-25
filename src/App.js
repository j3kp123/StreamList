import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import StreamList from './components/StreamList';
import SubscriptionList from './components/SubscriptionList';
import Checkout from './components/Checkout';
import Movies from './components/Movies';
import About from './components/About';
import MovieSearch from './components/MovieSearch'; 
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const App = () => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true'; // Retrieve authentication state from localStorage
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((cartItem) => cartItem.id === item.id);
      if (itemExists) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, amount: cartItem.amount + 1 } : cartItem
        );
      } else {
        return [...prevItems, { ...item, amount: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <GoogleOAuthProvider clientId="292949969510-k6cn8f5ve6qug17n741jnmt5eb91b311.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout cartItems={cartItems} isPopup={false} />
            }
          />
          <Route
            path="/*"
            element={
              isAuthenticated ? (
                <>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<StreamList />} />
                    <Route
                      path="/cart"
                      element={
                        <SubscriptionList
                          cartItems={cartItems}
                          addToCart={addToCart}
                          removeFromCart={removeFromCart}
                        />
                      }
                    />
                    <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/search" element={<MovieSearch />} />
                  </Routes>
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLoginSuccess = (response) => {
    console.log('Login successful:', response);
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // Save authentication state to localStorage
    navigate('/');
  };

  const handleLoginFailure = (error) => {
    console.log('Login failed:', error);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <img src="/streamlist-icon-192x192.png" alt="StreamList Logo" style={{ marginBottom: '20px' }} />
      <h1 style={{ marginBottom: '20px', fontSize: '36px', color: '#333', textAlign: 'center' }}>StreamList</h1>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
        buttonText="Sign in with Google"
      />
    </div>
  );
};

export default App;
