import React from "react";

const Cart = ({ cart }) => {
  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>No tickets in the cart</p>
      ) : (
        <ul>
          {cart.map((ticket, index) => (
            <li key={index}>
              {ticket.name} - ${ticket.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;