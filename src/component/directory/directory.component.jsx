import categories from "../../data";
import CategoryItem from "../category/category-item.component";
import "./directory.styles.scss";

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
