import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducer from './errorReducers';
import meals from './meals';

export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
	meals
});
