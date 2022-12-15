import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { setCategories } from "../../store/categories/category.actions";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { useDispatch } from "react-redux";

import "./shop.styles.scss";
const Shop = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoriesArray = await getCategoriesAndDocuments("categories");
			//console.log(categoriesArray);
			dispatch(setCategories(categoriesArray));
		};
		getCategoriesMap();
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
