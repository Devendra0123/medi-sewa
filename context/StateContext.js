import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie'

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [user, setUser] = useState();

  useEffect(() => {
    const items = Cookies.get('cartItems');
    const quantity = Cookies.get('totalQuantity');
    const price = Cookies.get('totalPrice');

    if (items) {
      const data = JSON.parse(items);
      const money = JSON.parse(price);
      const number = JSON.parse(quantity);
      setCartItems(data)
      setTotalPrice(money)
      setTotalQuantities(number)
    }

  }, [])

  useEffect(() => {
    const user = Cookies.get('user');
    if (user) {
      const account = JSON.parse(user)
      setUser(account)
    }
  }, [])



  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems?.find((item) => item._id === product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      let updatedCartItems = [];
      cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {

          const updatedItem = {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity
          }
     
          updatedCartItems.push(updatedItem)
        }
        else {
          updatedCartItems.push(cartProduct)
        }
      })

      setCartItems(updatedCartItems);
      const price = totalPrice + product.price * quantity;
      const number = totalQuantities + quantity

      Cookies.set('totalPrice', JSON.stringify(price));
      Cookies.set('totalQuantity', JSON.stringify(number));
      Cookies.set('cartItems', JSON.stringify(updatedCartItems));
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
      const items = [...cartItems, { ...product }];

      const price = totalPrice + product.price * quantity;
      const number = totalQuantities + quantity;

      Cookies.set('totalQuantity', JSON.stringify(number));
      Cookies.set('totalPrice', JSON.stringify(price));
      Cookies.set('cartItems', JSON.stringify(items));
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  }

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);

    const price = totalPrice - foundProduct.price * foundProduct.quantity;
    const number = totalQuantities - foundProduct.quantity;

    Cookies.set('totalQuantity', JSON.stringify(number));
    Cookies.set('totalPrice', JSON.stringify(price));
    Cookies.set('cartItems', JSON.stringify(newCartItems))
  }

  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id)

    if (value === 'inc') {
      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
      Cookies.set('cartItems', JSON.stringify([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]));
      Cookies.set('totalQuantity', JSON.stringify(totalQuantities + 1));
      Cookies.set('totalPrice', JSON.stringify(totalPrice + foundProduct.price))
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
        Cookies.set('cartItems', JSON.stringify([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]));
        Cookies.set('totalQuantity', JSON.stringify(totalQuantities - 1));
        Cookies.set('totalPrice', JSON.stringify(totalPrice - foundProduct.price))
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
  }

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  }

  const addUser = (user) => {
    setUser(user);
    Cookies.set('user', JSON.stringify(user))
  }

  const removeUser = () => {
    setUser(null);
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        user,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        addUser,
        removeUser
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);