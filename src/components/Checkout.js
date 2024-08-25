import React, { useEffect, useState } from 'react';
import './Checkout.css';

const Checkout = ({ isPopup }) => {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  });

  // Handle popup window close event
  useEffect(() => {
    if (isPopup) {
      const handleBeforeUnload = (e) => {
        const confirmationMessage = 'Are you sure you want to leave? Your order is not confirmed yet.';
        e.returnValue = confirmationMessage; // Gecko, Trident, Chrome 34+
        return confirmationMessage; // Gecko, WebKit, Chrome <34
      };

      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [isPopup]);

  // Load cart items from localStorage
  useEffect(() => {
    const savedCartItems = localStorage.getItem('cart');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === 'cardNumber' ? formatCardNumber(value) :
               name === 'expirationDate' ? formatExpirationDate(value) : value,
    });
  };

  // Format card number
  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{4})(?=\d)/g, '$1 ')
      .trim();
  };

  // Format expiration date as MM/YY
  const formatExpirationDate = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d{0,2})/, '$1/$2')
      .slice(0, 5); // Ensure max length is 5 characters
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Save form data to localStorage
    localStorage.setItem('checkoutInfo', JSON.stringify(formData));
    alert('Order confirmed!');
  };

  // Check if the cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <h2>Order Summary</h2>
      <ul className="checkout-list">
        {cartItems.map((item) => (
          <li key={item.id} className="checkout-item">
            <img src={item.img} alt={item.service} className="checkout-image" />
            <div>
              <h3>{item.service}</h3>
              <p>{item.serviceInfo}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>
      <h2>
        Total: $
        {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
      </h2>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            name="zipCode"
            placeholder="ZIP Code"
            value={formData.zipCode}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={formData.cardNumber}
            maxLength="19"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="expirationDate"
            placeholder="Expiration Date (MM/YY)"
            value={formData.expirationDate}
            maxLength="5"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={formData.cvv}
            maxLength="4"
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="checkout-button">
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
