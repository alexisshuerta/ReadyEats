import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { Table, Button, Container, Row, Col, Card } from 'react-bootstrap';

import BusinessNav from './BusinessNav';
import BusinessForm from './BusinessForm';
import SelectedMeal from './SelectedMeal';
import Menu from './Menu';
import Upload from './Upload';
import { addMeal, getMeals } from '../../actions/mealActions';
import Chicken from '../../img/chicken.jpg';

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			description: '',
			isVegan: '',
			isSelected: false,
			errors: {}
		};
	}
	// componentDidMount() {
	// 	this.props.getMeals();
	// }

	onLogoutClick = (e) => {
		e.preventDefault();
		this.props.logoutUser();
	};

	onSelect = (e) => {
		e.preventDefault();
		this.setState({ isSelected: true });
	};
	onSubmit = (e) => {
		e.preventDefault();

		const select = this.state.isSelected ? 'business' : 'user';

		const meal = {
			name: this.state.name,
			description: this.state.description,
			isVegan: this.state.isVegan,
			password2: this.state.password2
		};

		this.props.getMeal(meal, this.props.history);
	};

	render() {
		const { user } = this.props.auth;

		return (
			<div>
				<BusinessNav />
				<Container fluid>
					<Row style={{ width: '1000px' }}>
						<Col>
							<h4>
								<b>Hey there,</b> {user.name}
								<p className="flow-text grey-text text-darken-1">
									You are logged into{' '}
									<span style={{ fontFamily: 'monospace' }}>ReadyEats Business</span> as a {user.role}
								</p>
							</h4>
						</Col>
					</Row>
				</Container>
				<div>
					<h4>Fill in your new meal here</h4>
				</div>
				<BusinessForm />
				<Row>
					<Col>
						<h4>Your list of meals</h4>
					</Col>
				</Row>
				<Row>
					<Col>
						<Menu />
					</Col>
					<Col md={{ span: 3 }}>
						<SelectedMeal />
					</Col>
				</Row>
			</div>
		);
	}
}

Dashboard.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	meal: PropTypes.object.isRequired,
	addMeal: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	meal: state.meal
});

export default connect(mapStateToProps, { addMeal, getMeals, logoutUser })(Dashboard);
