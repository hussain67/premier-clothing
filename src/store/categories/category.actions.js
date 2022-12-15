import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPE } from "./category.types";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

export const fetchCategoryStart = () => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORY_START);

export const fetchCategorySucces = categoriesArray => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORY_SUCCESS, categoriesArray);

export const fetchCategoryFailed = error => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORY_FAILED, error);

export const fetchCategoriesAsync = () => async dispatch => {
	dispatch(fetchCategoryStart);
	try {
		const categoriesArray = await getCategoriesAndDocuments("categories");
		dispatch(fetchCategorySucces(categoriesArray));
	} catch (error) {
		dispatch(fetchCategoryFailed(error));
	}
};
