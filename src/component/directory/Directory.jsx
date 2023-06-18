import categories from "../../data";
import CategoryItem from "../category-item/Category-item";
import "./directory.scss";

const Directory = () => {
	return (
		<div className="categories-container">
			{categories.map(category => (
				<CategoryItem
					key={category.id}
					category={category}
				/>
			))}
		</div>
	);
};
export default Directory;
