import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Authentication from "./routes/authentication/authentication.component";
import Checkout from "./routes/checkout/checkout.component";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Shop from "./routes/shop/shop.component";
import { onAuthStateChangedListner, createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.action";
import { useDispatch } from "react-redux";

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
					path="checkout"
					element={<Checkout />}
				/>
			</Route>
		</Routes>
	);
};

export default App;
