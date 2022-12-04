import { Outlet, Link } from "react-router-dom";
import "./navigation.styles.scss";

import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import { useContext } from "react";
import { UserContext } from "../../component/contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
	const { currentUser } = useContext(UserContext);

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
				</div>
			</div>
			<Outlet />
		</>
	);
};

export default Navigation;
