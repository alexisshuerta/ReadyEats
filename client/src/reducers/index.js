import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducer from './errorReducers';
import mealReducer from './mealReducer';

export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
	meal: mealReducer
});
