import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
//import PRODUCTS from "../../shop-data.json";
//import { addCollectionAndDocuments } from "../../utils/firebase/firebase.utils";
//import SHOP_DATA from "../../shop-data";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
export const CategoriesContext = createContext({
	categoriesMap: {},

	setCategories: () => {}
});

const CategoriesProvider = ({ children }) => {
	const [categoriesMap, setCategoriesMap] = useState({});
	/*
	useEffect(() => {
		addCollectionAndDocuments("categories", SHOP_DATA);
	}, []); */
	useEffect(() => {
		const categoriesMap = async () => {
			const categoryMap = await getCategoriesAndDocuments();
			console.log(categoryMap);
			setCategoriesMap(categoryMap);
		};
		categoriesMap();
	}, []);

	const value = { categoriesMap, setCategoriesMap };
	return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
};
export default CategoriesProvider;
