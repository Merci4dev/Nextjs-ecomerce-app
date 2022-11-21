import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

// usando la funcin createContext() como hook
const Context = createContext();

// la propiedad children dentro del comoponete Contex siempre sera considerada como un children
export const StateContext = ({children}) => {

  // Declarando la variable de estado
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(0);

  // producto que se quiere actualizar
  let findProduct;
  // Index del producto que se quiere actualizar
  let index;


  // funcion para añadir un producto. si el producto ya esta en el car lo reconoce y solo incrementea la cantidad
  const onAdd = (product, quantity) => {
    // observa si el producto esta en el carro
    const checkProductInCart = cartItems.find(
      (cartProduct) => cartProduct._id === product._id,
    );

    // si producto se encuentra en el caro incrementa el precio y la cantida
    if (checkProductInCart) {
      setTotalPrice(totalPrice + product.price * quantity);
      setTotalQuantities(totalQuantities + quantity);
     
      // actualiza el caro
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return { ...cartProduct, quantity: cartProduct.quantity + quantity };
        }
        return cartProduct;
      });

      // actualiza el carro
      setCartItems(updatedCartItems);

      toast.success(`${qty} ${product.name} added`);
      
    } else {
      setTotalPrice(totalPrice + product.price * quantity);
      setTotalQuantities(totalQuantities + quantity);
      // eslint-disable-next-line no-param-reassign
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);

      toast.success(`${qty} ${product.name} added`);
    }
  };


  // Funcin que remueve un producto del cart
  const onRemove = (product) => {
    findProduct = cartItems.find((item) => item._id === product._id);
    const tempCart = cartItems.filter((item) => item._id !== product._id);
    setTotalPrice(totalPrice - findProduct.price * findProduct.quantity);
    setTotalQuantities(totalQuantities - findProduct.quantity);
    setCartItems(tempCart);
  };

  // FUncion que actualiza la cantitades en en cart. cuando se tienen multiples item en el cart y se quire incrementear uno solo. esta es la logica
  const toggleCartItemQuantity = (id, value) => {

    // encuentra un item individual para actualizar 
    findProduct = cartItems.find((item) => item._id === id);
    // encuentra un idex individual par actualizar
    index = cartItems.findIndex((product) => product._id === id);

    // incrementa el valor
    if (value === 'inc') {
      findProduct.quantity += 1;
      cartItems[index] = findProduct;

      setTotalPrice(totalPrice + findProduct.price);
      setTotalQuantities(totalQuantities + 1);
    }
    
    // decrementa el valor
    if (value === 'dec') {
      if (findProduct.quantity > 1) {
        findProduct.quantity -= 1;
        cartItems[index] = findProduct;
        setTotalPrice(totalPrice - findProduct.price);
        setTotalQuantities(totalQuantities - 1);
      }
    }
  };


  // Icrementa los producto
  const incQty = () => {
    setQty((oldQty) => {
      const tempQty = oldQty + 1;
      return tempQty;
    });
  };
  
  // Decrementa los producto
  const decQty = () => {
    setQty((oldQty) => {
      let tempQty = oldQty - 1;
      if (tempQty < 1) {
        tempQty = 1;
      }
      return tempQty;
    });
  };


  // El conponte Context retorara todo esto valores la cual estaran acecible de forma global
  return (
    <Context.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalQuantities,
        setTotalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        totalPrice,
        setTotalPrice,
        toggleCartItemQuantity,
        onRemove
     
      }}
    >
      {children}
    </Context.Provider>
  );
}

// funcion que permite capturar el estado global
export const useStateContext = () => useContext(Context);
