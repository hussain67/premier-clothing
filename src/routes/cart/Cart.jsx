import CartItem from "../../component/cart-item/Cart-item";
import "./cart.scss";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector";
import Button from "../../component/button/button";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
	const cartItems = useSelector(selectCartItems);
	const cartTotal = useSelector(selectCartTotal);

	const navigate = useNavigate();
	const goToCheckoutHandler = () => {
		navigate("/checkout");
	};
	if (cartItems.length === 0) {
		return (
			<div className="cart-empty">
				<h1>Your cart is empty </h1>
				<div className="btn-fill">
					<Button onClick={() => navigate("/")}>Fill it</Button>
				</div>
			</div>
		);
	}
	return (
		<div className="cart-container">
			<div className="cart-header">
				<div className="header-block">
					<span>Product</span>
				</div>

				<div className="header-block">
					<span>Quantity</span>
				</div>

				<div className="header-block">
					<span>Subtotal</span>
				</div>
				<div className="header-block">
					<span>Remove</span>
				</div>
			</div>

			{cartItems.map(cartItem => (
				<CartItem
					key={cartItem.id}
					cartItem={cartItem}
				/>
			))}

			<div className="total">Total: £{cartTotal}</div>
			<div className="link-container">
				<Button onClick={() => navigate("/")}> Continue Shopping</Button>
				<Button onClick={goToCheckoutHandler}>Checkout</Button>
			</div>
		</div>
	);
};

export default CartPage;
