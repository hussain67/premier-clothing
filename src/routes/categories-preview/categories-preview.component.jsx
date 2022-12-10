import { useContext } from "react";
import CategoryPreview from "../../component/category-preview/category-preview.component";
import { CategoriesContext } from "../../component/contexts/categories.context";
//import ProductCard from "../../component/product-card/product-card.component";

const CategoriesPreview = () => {
	const { categoriesMap } = useContext(CategoriesContext);
	console.log(categoriesMap);
	return (
		<div className="category-preview-container">
			{Object.keys(categoriesMap).map(title => {
				const products = categoriesMap[title];
				return (
					<CategoryPreview
						key={title}
						title={title}
						products={products}
					/>
				);
			})}
		</div>
	);
};
export default CategoriesPreview;
