// Cart.jsx
import React from 'react';

const Cart = ({ cartItems, onRemove }) => {
  return (
    <div className="cart-container">
      <h3>Your Cart</h3>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <div>
                <h4>{item.title}</h4>
                <p>{item.price}</p>
              </div>
              <button onClick={() => onRemove(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-total">
        <p>Total Items: {cartItems.length}</p>
      </div>
    </div>
  );
};

export default Cart;
