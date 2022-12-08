import { useEffect } from "react";
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
const removeCartItem = (cartItems, cartItemToRemove) => {
	//Find the cart item to remove
	const existingItem = cartItems.find(item => item.id === cartItemToRemove.id);

	// Check if the number of item is one, if so remove the item
	if (existingItem.quantity === 1) {
		return cartItems.filter(item => item.id !== cartItemToRemove.id);
	}
	//
	if (existingItem.quantity > 1) {
		return cartItems.map(item => (item.id === cartItemToRemove.id ? { ...item, quantity: item.quantity - 1 } : item));
	}
};

const clearCartItem = (cartItems, cartItemToClear) => {
	return cartItems.filter(item => item.id !== cartItemToClear.id);
};

export const CartContext = createContext({ isCartOpen: false, setIsCartOpen: () => {}, cartItems: [], addItemToCart: () => {}, cartCount: 0, removeItemFromCart: () => {}, clearItemFromCart: () => {}, cartTotal: 0 });

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(true);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [cartTotal, setCartTotal] = useState(0);

	useEffect(() => {
		const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
		setCartCount(newCartCount);
	}, [cartItems]);

	useEffect(() => {
		const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
		setCartTotal(newCartTotal);
	}, [cartItems]);

	const addItemToCart = productToAdd => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};

	const removeItemFromCart = cartItemToRemove => {
		setCartItems(removeCartItem(cartItems, cartItemToRemove));
	};

	const clearItemFromCart = cartItemToClear => {
		setCartItems(clearCartItem(cartItems, cartItemToClear));
	};
	const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, cartCount, clearItemFromCart, cartTotal };
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
