import { useNavigate } from "react-router-dom";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import "./cart-dropdown.styles.scss";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
const CartDropdown = () => {
	const cartItems = useSelector(selectCartItems);
	const navigate = useNavigate();
	const goToCheckoutHandler = () => {
		navigate("./checkout");
	};
	return (
		<>
			<div className="cart-dropdown-container">
				<div className="cart-item">
					{" "}
					{cartItems.map(item => (
						<CartItem
							key={item.id}
							cartItem={item}
						/>
					))}
				</div>
				<Button onClick={goToCheckoutHandler}>Checkout</Button>
			</div>
		</>
	);
};

export default CartDropdown;
