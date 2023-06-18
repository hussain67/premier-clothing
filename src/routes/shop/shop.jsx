import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/Categories-preview";
import Category from "../category/Category";

import { useDispatch } from "react-redux";
import { fetchCategoriesAsync } from "../../store/categories/category.actions";

import "./shop.scss";
const Shop = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCategoriesAsync());
	}, [dispatch]);
	return (
		<Routes>
			<Route
				index
				element={<CategoriesPreview />}
			/>
			<Route
				path=":category"
				element={<Category />}
			/>
		</Routes>
	);
};
export default Shop;
