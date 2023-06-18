import { Outlet, Link } from "react-router-dom";
import "./navigation.scss";
import { useSelector } from "react-redux";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../component/cart-icon/Cart-icon";

const Navigation = () => {
	const currentUser = useSelector(state => state.user.currentUser);

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
			</div>
			<Outlet />
		</>
	);
};

export default Navigation;
