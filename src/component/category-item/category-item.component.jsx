import { useNavigate } from "react-router-dom";
import "./category-item.styles.scss";

const CategoryItem = ({ category }) => {
	const { title, imageUrl } = category;
	const navigate = useNavigate();
	return (
		<div className="category-item-container">
			{/* img */}
			<div
				className="background-image"
				style={{ backgroundImage: `url(${imageUrl})` }}
			></div>
			<div
				className="category-body-container"
				onClick={() => {
					navigate(`/shop/${title.toLowerCase()}`);
				}}
			>
				<h2>{title}</h2>
				<p>Shop now</p>
			</div>
		</div>
	);
};

export default CategoryItem;
