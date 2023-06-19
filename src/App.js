import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Authentication from "./routes/authentication/Authentication";
import Checkout from "./routes/checkout/Checkout";
import Home from "./routes/home/Home";
import Navigation from "./routes/navigation/Navigation";

import { onAuthStateChangedListner, createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.action";
import { useDispatch } from "react-redux";
import Cart from "./routes/cart/Cart";
import Shop from "./routes/shop/shop";

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const unsubcribe = onAuthStateChangedListner(user => {
			if (user) {
				createUserDocumentFromAuth(user);
			}
			dispatch(setCurrentUser(user));
		});
		return unsubcribe;
	}, [dispatch]);

	return (
		<Routes>
			<Route
				path="/"
				element={<Navigation />}
			>
				<Route
					index
					element={<Home />}
				/>
				<Route
					path="shop/*"
					element={<Shop />}
				/>
				<Route
					path="auth"
					element={<Authentication />}
				/>
				<Route
					path="cart"
					element={<Cart />}
				/>
				<Route
					path="checkout"
					element={<Checkout />}
				/>
			</Route>
		</Routes>
	);
};

export default App;
