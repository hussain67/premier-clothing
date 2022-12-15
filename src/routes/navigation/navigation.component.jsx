import { Outlet, Link } from "react-router-dom";
import "./navigation.styles.scss";
import { useSelector } from "react-redux";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../component/cart-icon/cart-icon.component";
import CartDropdown from "../../component/cart-dropdown/cart-dropdown.component";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

const Navigation = () => {
	const currentUser = useSelector(state => state.user.currentUser);
	const isCartOpen = useSelector(selectIsCartOpen);

	return (
		<>
			<div className="navigation">
				<Link
					className="logo-container"
					to="/"
				>
					<CrownLogo />
				</Link>
				<div className="nav-links-container">
					<Link
						className="nav-link"
						to="/shop"
					>
						SHOP
					</Link>
					<Link
						className="nav-link"
						to="/auth"
					>
						{currentUser ? <span onClick={signOutUser}> SIGN OUT</span> : "SIGN IN"}
					</Link>
					<CartIcon />
				</div>
				{isCartOpen && <CartDropdown />}
			</div>
			<Outlet />
		</>
	);
};

export default Navigation;
