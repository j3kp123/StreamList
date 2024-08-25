import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreditCardForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');

  const navigate = useNavigate();

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove all non-digit characters
    const formattedValue = value.match(/.{1,4}/g)?.join(' ') || ''; // Add a space every 4 digits
    setCardNumber(formattedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cardDetails = {
      cardNumber,
      cardName,
      expirationDate,
      cvv,
    };
    localStorage.setItem('cardDetails', JSON.stringify(cardDetails));
    alert('Card details saved successfully.');
    navigate('/'); // Redirect to the home page after saving card details
  };

  return (
    <div className="credit-card-form-container">
      <h2>Credit Card Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            maxLength="19"
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>
        <div>
          <label>Name on Card</label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Expiration Date</label>
          <input
            type="text"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            placeholder="MM/YY"
            required
          />
        </div>
        <div>
          <label>CVV</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            maxLength="3"
            required
          />
        </div>
        <button type="submit">Save Card</button>
      </form>
    </div>
  );
};

export default CreditCardForm;
