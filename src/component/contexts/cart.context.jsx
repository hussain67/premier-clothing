import { useReducer } from "react";
import { createContext } from "react";
import { USER_ACTION_TYPE } from "./constants";

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

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	cartTotal: 0
};
const cartReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_ACTION_TYPE.SET_CART_ITEMS:
			return {
				...state,
				...payload
			};
		case USER_ACTION_TYPE.SET_IS_CART_OPEN:
			return {
				...state,
				isCartOpen: !state.isCartOpen
			};
		default:
			throw new Error(`Unhandled type ${type} in cartReducer`);
	}
};
export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
	const { isCartOpen, cartItems, cartCount, cartTotal } = state;

	const updateCartItemsReducer = newCartItems => {
		const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
		const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
		dispatch({
			type: USER_ACTION_TYPE.SET_CART_ITEMS,
			payload: {
				cartItems: newCartItems,
				cartCount: newCartCount,
				cartTotal: newCartTotal
			}
		});
	};
	const setIsCartOpen = () => {
		dispatch({ type: USER_ACTION_TYPE.SET_IS_CART_OPEN });
	};
	const addItemToCart = productToAdd => {
		let newCartItems = addCartItem(cartItems, productToAdd);
		updateCartItemsReducer(newCartItems);
	};

	const removeItemFromCart = cartItemToRemove => {
		const newCartItems = removeCartItem(cartItems, cartItemToRemove);
		updateCartItemsReducer(newCartItems);
	};

	const clearItemFromCart = cartItemToClear => {
		const newCartItems = clearCartItem(cartItems, cartItemToClear);
		updateCartItemsReducer(newCartItems);
	};

	const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, cartTotal, removeItemFromCart, clearItemFromCart };
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
