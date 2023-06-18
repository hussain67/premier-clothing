import { addItemToCart, removeItemFromCart, clearItemFromCart } from "../../store/cart/cart.actions";
import "./cart-item.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { FaTrash } from "react-icons/fa";

const CheckoutItem = ({ cartItem }) => {
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);
	const { name, imageUrl, price, quantity } = cartItem;
	const subtotal = quantity * price;

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
		<section className="cart-item-container">
			<article className="item-container">
				<img
					src={imageUrl}
					alt={name}
				/>
				<div className="item-info">
					<h5 className="name">{name}</h5>
					<h5 className="price">£{price}</h5>
				</div>
			</article>

			<article>
				<div className="quantity">
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
				</div>
			</article>
			<article className="subtotal">
				{" "}
				<span>Subtotal:</span> £ {subtotal}
			</article>

			<article
				className="remove-button"
				onClick={clearItemFromCartHandler}
			>
				<FaTrash />
			</article>
		</section>
	);
};
export default CheckoutItem;
