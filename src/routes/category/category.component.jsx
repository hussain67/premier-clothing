import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesIsLoading, selectCategoriesMap } from "../../store/categories/category.selector";
import { useParams } from "react-router-dom";
import ProductCard from "../../component/product-card/product-card.component";
import "./category.styles.scss";
import Spinner from "../../component/spinner/spinner.component";

const Category = () => {
	const { category } = useParams();
	const categoriesMap = useSelector(selectCategoriesMap);
	const isLoading = useSelector(selectCategoriesIsLoading);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	if (isLoading) <Spinner />;

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
