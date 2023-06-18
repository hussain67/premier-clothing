import { useNavigate } from "react-router-dom";
import ProductCard from "../product-card/Product-card";
import "./category-preview.scss";

const CategoryPreview = ({ title, products }) => {
	const navigate = useNavigate();
	const goToCategory = title => {
		navigate(`/shop/${title}`);
	};

	return (
		<div className="category-preview-container">
			<h2>
				<span
					className="title"
					onClick={() => goToCategory(title)}
				>
					{title.toUpperCase()}
				</span>
			</h2>
			<div className="preview">
				{products
					.filter((_, idx) => idx < 4)
					.map(product => (
						<ProductCard
							key={product.id}
							product={product}
						/>
					))}
			</div>
		</div>
	);
};

export default CategoryPreview;
