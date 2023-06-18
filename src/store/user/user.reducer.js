import { USER_ACTION_TYPE } from "./user.types";

const initialState = {
	currentUser: null
};
export const userReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_ACTION_TYPE.SET_CURRENT_USER:
			return {
				...state,
				currentUser: payload
			};
		default:
			return state;
	}
};
