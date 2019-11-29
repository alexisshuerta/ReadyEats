import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { useSelector } from 'react-redux';

import { GET_MEALS, ADD_MEAL, DELETE_MEAL, MEALS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getMeals = () => (dispatch, getState) => {
	const business = useSelector((state) => state.auth.user);
	const [ menu, setMenu ] = React.useState([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ]);

	axios
		.get('/api/menu/get', {
			params: {
				shopid: business.id
			}
		})
		.then((res) => {
			setMenu(res.data.menu);
			console.log(res.data.menu);
		})
		.catch((err) => {
			console.log(err);
		});
};

export const addMeal = (meal) => (dispatch, getState) => {
	axios
		.post('/api/meals', meal, tokenConfig(getState))
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

export const setItemsLoading = () => {
	return {
		type: MEALS_LOADING
	};
};
