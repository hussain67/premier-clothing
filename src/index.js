import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./component/contexts/user.context";
import reportWebVitals from "./reportWebVitals";
import CategoriesProvider from "./component/contexts/categories.context";
import { CartProvider } from "./component/contexts/cart.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<UserProvider>
				<CategoriesProvider>
					<CartProvider>
						<App />
					</CartProvider>
				</CategoriesProvider>
			</UserProvider>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
