import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartContext } from "../contexts/cart.context";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
	const navigate = useNavigate();
	const goToCheckoutHandler = () => {
		navigate("./checkout");
	};
	const { cartItems } = useContext(CartContext);
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
