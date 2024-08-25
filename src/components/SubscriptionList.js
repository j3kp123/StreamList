import React, { useState, useEffect } from 'react';
import './SubscriptionList.css';

const SubscriptionList = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const subscriptions = [
    {
      id: 1,
      service: "Basic Subscription",
      serviceInfo: "For one User",
      price: 4.99,
      img: "https://creazilla-store.fra1.digitaloceanspaces.com/icons/3231802/ticket-icon-md.png",
      amount: 1,
    },
    {
      id: 2,
      service: "Gold Subscription",
      serviceInfo: "Share with Family",
      price: 9.99,
      img: "https://creazilla-store.fra1.digitaloceanspaces.com/icons/3237088/ticket-icon-md.png",
      amount: 1,
    },
    {
      id: 3,
      service: "Premium Subscription",
      serviceInfo: "Share with the World",
      price: 12.99,
      img: "https://creazilla-store.fra1.digitaloceanspaces.com/icons/3258730/ticket-icon-md.png",
      amount: 1,
    },
    {
      id: 4,
      service: "Social Media Sharing Subscription",
      serviceInfo: "Share your list",
      price: 2.99,
      img: "https://cdn.creazilla.com/photos/3730387/social-media-1908766_1280-photo-md.jpeg",
      amount: 1,
    },
  ];

  const addToCart = (subscription) => {
    const existingItem = cart.find(item => item.id === subscription.id);

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === subscription.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...subscription, quantity: 1 }]);
    }
  };

  const removeFromCart = (subscriptionId) => {
    setCart(cart.filter(item => item.id !== subscriptionId));
  };

  const updateQuantity = (subscriptionId, quantity) => {
    if (quantity === 0) {
      removeFromCart(subscriptionId);
    } else {
      setCart(cart.map(item =>
        item.id === subscriptionId
          ? { ...item, quantity: quantity }
          : item
      ));
    }
  };

  const handleCheckout = () => {
    localStorage.setItem('cart', JSON.stringify(cart)); // Store cart in localStorage for new window
    const newWindow = window.open('/checkout', 'Checkout', 'width=800,height=900');
    newWindow.focus();
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="subscription-container">
      <h1 className="subscription-header">Available Subscriptions</h1>
      <div className="subscription-list">
        {subscriptions.map((subscription) => (
          <div className="subscription-item" key={subscription.id}>
            <img src={subscription.img} alt={subscription.service} className="subscription-image" />
            <h3>{subscription.service}</h3>
            <p>{subscription.serviceInfo}</p>
            <p>${subscription.price.toFixed(2)}</p>
            {cart.find(item => item.id === subscription.id) ? (
              <div>
                <button className="subscription-button remove-button" onClick={() => updateQuantity(subscription.id, cart.find(item => item.id === subscription.id).quantity - 1)}>
                  -
                </button>
                <span>{cart.find(item => item.id === subscription.id).quantity}</span>
                <button className="subscription-button add-button" onClick={() => updateQuantity(subscription.id, cart.find(item => item.id === subscription.id).quantity + 1)}>
                  +
                </button>
              </div>
            ) : (
              <button className="subscription-button add-button" onClick={() => addToCart(subscription)}>
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div className="checkout-bar">
          <span>Total: ${totalAmount}</span>
          <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default SubscriptionList;
