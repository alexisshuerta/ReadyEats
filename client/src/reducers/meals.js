import { GET_MEALS, ADD_MEAL, DELETE_MEAL, MEALS_LOADING } from '../actions/types';

const initialState = {
	meals: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_MEALS:
			return {
				...state,
				meals: action.payload
			};
		case DELETE_MEAL:
			return {
				...state,
				meals: state.meals.filter((meal) => meal._id !== action.payload)
			};
		case ADD_MEAL:
			return {
				...state,
				meals: [ action.payload, ...state.meals ]
			};
		case MEALS_LOADING:
			return {
				...state
			};
		default:
			return state;
	}
}
