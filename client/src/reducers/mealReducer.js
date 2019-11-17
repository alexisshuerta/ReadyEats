import { GET_MEALS, ADD_MEAL, DELETE_MEAL, MEALS_LOADING } from '../actions/types';

const initialState = {
	meals: [],
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_MEALS:
			return {
				...state,
				meals: action.payload,
				loading: false
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
				...state,
				loading: true
			};
		default:
			return state;
	}
}
