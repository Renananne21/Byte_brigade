import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Cart ({ cartEvents, removeFromCart, updateQuantity })  {
  const [items, setItems] = useState(cartEvents || []);

  useEffect(() => {
    setItems(cartEvents || []);
  }, [cartEvents]);

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      return total + (parseFloat(item.price.replace('$', '')) * item.quantity);
    }, 0);
  };

  const handleCheckout = () => {
    
    navigate('/buy-tickets/:eventId');
  };


  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {!cartEvents || cartEvents.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map((event) => (
              <div key={event.id} className="cart-item">
                <img src={event.image} alt={event.title} />
                <div className="item-details">
                  <h3>{event.title}</h3>
                  <p>{event.date} at {event.time}</p>
                  <p>{event.location}</p>
                  <p>Price: {event.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(event.id, event.quantity - 1)}>-</button>
                    <span>{event.quantity}</span>
                    <button onClick={() => updateQuantity(event.id, event.quantity + 1)}>+</button>
                  </div>
                </div>
                <button className="remove-button" onClick={() => removeFromCart(event.id)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total: ${calculateTotal().toFixed(2)}</h3>
            <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </>
      )}
      <div className="cart-total">
        <p>Total Items: {cartItems.length}</p>
      </div>
    </div>
  );
};

export default Cart;
