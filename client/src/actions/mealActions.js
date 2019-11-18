import axios from 'axios';
import { GET_MEALS, ADD_MEAL, DELETE_MEAL, MEALS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getMeals = (mealInfo) => (dispatch) => {
	dispatch(setMealsLoading());
	axios
		.get('/api/meals/get', mealInfo)
		.then((res) =>
			dispatch({
				type: GET_MEALS,
				payload: res.data
			})
		)
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addMeal = (meal) => (dispatch, getState) => {
	axios
		.post('/api/meals/setmeal', meal, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: ADD_MEAL,
				payload: res.data
			})
		)
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteMeal = (id) => (dispatch, getState) => {
	axios
		.delete(`/api/meals/${id}`, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: DELETE_MEAL,
				payload: id
			})
		)
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const setMealsLoading = () => {
	return {
		type: MEALS_LOADING
	};
};
