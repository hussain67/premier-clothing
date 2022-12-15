import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";
//import { useContext } from "react";
import { useParams } from "react-router-dom";
//import { CategoriesContext } from "../../component/contexts/categories.context";
import ProductCard from "../../component/product-card/product-card.component";
import "./category.styles.scss";

const Category = () => {
	const { category } = useParams();
	const categoriesMap = useSelector(selectCategoriesMap);
	//const { categoriesMap } = useContext(CategoriesContext);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	return (
		<div className="category-container">
			{products &&
				products.map(product => (
					<ProductCard
						key={product.id}
						product={product}
					/>
				))}
		</div>
	);
};

export default Category;
