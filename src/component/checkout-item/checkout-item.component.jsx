import { addItemToCart, removeItemFromCart, clearItemFromCart } from "../../store/cart/cart.actions";
import "./checkout-item.styles.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
const CheckoutItem = ({ cartItem }) => {
	//const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext();
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);
	const { name, imageUrl, price, quantity } = cartItem;

	const clearItemFromCartHandler = () => {
		dispatch(clearItemFromCart(cartItems, cartItem));
	};
	const addItemToCartHandler = () => {
		dispatch(addItemToCart(cartItems, cartItem));
	};
	const removeItemFromCartHandler = () => {
		dispatch(removeItemFromCart(cartItems, cartItem));
	};
	return (
		<div className="checkout-item-container">
			<div className="image-container">
				<img
					src={imageUrl}
					alt={name}
				/>
			</div>

			<span className="name">{name}</span>
			<span className="quantity">
				<div
					className="arrow"
					onClick={removeItemFromCartHandler}
				>
					&#10094;
				</div>
				<span className="value"> {quantity} </span>

				<div
					className="arrow"
					onClick={addItemToCartHandler}
				>
					&#10095;
				</div>
			</span>

			<span className="price">£{price}</span>
			<div
				className="remove-button"
				onClick={clearItemFromCartHandler}
			>
				<span>&#10005;</span>
			</div>
		</div>
	);
};
export default CheckoutItem;
