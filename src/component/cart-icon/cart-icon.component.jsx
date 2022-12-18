import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { selectCartCount } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.actions";
import { useDispatch, useSelector } from "react-redux";

const CartIcon = () => {
	const dispatch = useDispatch();

	const cartCount = useSelector(selectCartCount);
	return (
		<div
			className="cart-icon-container"
			onClick={() => dispatch(setIsCartOpen(false))}
		>
			<ShoppingIcon className="shopping-icon" />
			<span className="item-count">{cartCount}</span>
		</div>
	);
};
export default CartIcon;
