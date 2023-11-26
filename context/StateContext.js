
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast'



const Context = createContext();




export const StateContext = ({children}) => {

    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

        const onAdd = (product, quantity) => {
  // Check if the product is already in the cart based on its _id
  const checkProductInCart = cartItems.find((item) => item._id === product._id);

  // If the product is already in the cart, update its quantity
  if (checkProductInCart) {
    const updatedCartItems = cartItems.map((cartProduct) =>
      cartProduct._id === product._id
        ? {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          }
        : cartProduct
    );
    setCartItems(updatedCartItems);
  } else {
    // If the product is not in the cart, add it with the specified quantity
    product.quantity = quantity;
    setCartItems([...cartItems, { ...product }]);
  }

  // Update total price and total quantities
  setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
  setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

  // Display a toast notification
  toast.success(`${quantity} ${product.name} added to the cart.`);
};


        const toggleCartItemQuanitity = (id, value) => {
  foundProduct = cartItems.find((item) => item._id === id);

  if (value === 'increase') {
    const updatedData = cartItems.map(item => (item._id === id ? { ...item, quantity: item.quantity + 1 } : item));
    setCartItems(updatedData);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
  } else if (value === 'decrease') {
    if (foundProduct.quantity > 1) {
      const updatedData = cartItems.map(item => (item._id === id ? { ...item, quantity: item.quantity - 1 } : item));
      setCartItems(updatedData);
      setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
    }
  }
};


          const onRemove = (product) => {
            foundProduct = cartItems.find((item) => item._id === product._id);
            const newCartItems = cartItems.filter((item) => item._id !== product._id);
        
            setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
            setCartItems(newCartItems);
          }
        

        const incQty = () => {
            setQty((prevQty) => prevQty + 1);
          }
        
          const decQty = () => {
            setQty((prevQty) => {
              if(prevQty - 1 < 1) return 1;
             
              return prevQty - 1;
            });
          }
    
 // Context provider value
 const contextValue = {
  showCart,
  cartItems,
  totalPrice,
  totalQuantities,
  qty,
  incQty,
  decQty,
  onAdd,
  toggleCartItemQuanitity,
  setShowCart,
  onRemove
};

return (
  <Context.Provider value={contextValue}>
     {children}
  </Context.Provider>
    )

}

 
export const useStateContext = () => useContext(Context);