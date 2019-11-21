import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';

import Landing from './components/layout/Landing';
import Form from './components/business/Form';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/private-route/PrivateRoute';
import Dashboard from './components/user/Dashboard';
import BusinessDashboard from './components/business/Dashboard';
import Pickup from './components/business/Pickup';

//testing
import Upload from './components/business/tempUpload';

if (localStorage.jwtToken) {
	const token = localStorage.jwtToken;
	setAuthToken(token);
	const decoded = jwt_decode(token);
	store.dispatch(setCurrentUser(decoded));
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		store.dispatch(logoutUser());
		window.location.href = './login';
	}
}

class App extends Component {
	onLogoutClick = (e) => {
		e.preventDefault();
		this.props.logoutUser();
	};

	render() {

		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Route exact path="/" component={Landing} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/form" component={Form} />
						<Route exact path="/pickup" component={Pickup} />
						<Route exact path="/upload" component={Upload} />
						<Switch>
							<PrivateRoute exact path="/dashboard" role="user" component={Dashboard} />
							<PrivateRoute
								exact
								path="/businessdashboard"
								role="business"
								component={BusinessDashboard}
							/>
						</Switch>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
