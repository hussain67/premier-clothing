import "./cart-icon.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { selectCartCount } from "../../store/cart/cart.selector";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartIcon = () => {
	const navigate = useNavigate();
	const goToCheckoutHandler = () => {
		navigate("./cart");
	};
	const cartCount = useSelector(selectCartCount);
	return (
		<div
			className="cart-icon-container"
			onClick={goToCheckoutHandler}
		>
			<ShoppingIcon className="shopping-icon" />
			<span className="item-count">{cartCount}</span>
		</div>
	);
};
export default CartIcon;
