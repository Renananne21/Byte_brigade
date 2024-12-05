import React, { createContext, useState } from "react";
import BuyTickets from "./BuyTickets";
import Cart from "./Cart";

export const CartContext = createContext();

const CartProviders = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (ticket) => {
    setCart((prevCart) => [...prevCart, ticket]);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      <div>
        <h1>Ticket Booking</h1>
        <BuyTickets />
        <Cart />
      </div>
    </CartContext.Provider>
  );
};

export default CartProviders;