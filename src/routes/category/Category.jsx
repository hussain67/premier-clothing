import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesIsLoading, selectCategoriesMap } from "../../store/categories/category.selector";
import { useParams } from "react-router-dom";
import ProductCard from "../../component/product-card/Product-card";
import "./category.scss";
import Spinner from "../../component/spinner/spinner";

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
		<article className="category">
			<h1>{category}</h1>
			<div className="category-container">
				{products &&
					products.map(product => (
						<ProductCard
							key={product.id}
							product={product}
						/>
					))}
			</div>
		</article>
	);
};

export default Category;
