import { useState } from "react";
import { createContext } from "react";

const addCartItem = (cartItems, productToAdd) => {
	//Find if card items contain
	const existingItem = cartItems.find(item => item.id === productToAdd.id);

	//if found increment quantity
	if (existingItem) {
		return cartItems.map(item => (item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item));
	}
	//Return new array with modified cart items or new cart item
	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({ isCartOpen: false, setIsCartOpen: () => {}, cartItems: [], addItemToCart: () => {}, totalItems: 0 });

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(true);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);

	const addItemToCart = productToAdd => {
		setCartCount(totalItems => {
			return totalItems + 1;
		});
		setCartItems(addCartItem(cartItems, productToAdd));
	};

	const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount };
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
