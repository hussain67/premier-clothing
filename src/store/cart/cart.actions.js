import { CART_ACTION_TYPE } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setIsCartOpen = boolean => createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, boolean);

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

/*
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
*/
export const addItemToCart = (cartItems, productToAdd) => {
	let newCartItems = addCartItem(cartItems, productToAdd);
	return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
	const newCartItems = removeCartItem(cartItems, cartItemToRemove);
	return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
	const newCartItems = clearCartItem(cartItems, cartItemToClear);
	return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
};
