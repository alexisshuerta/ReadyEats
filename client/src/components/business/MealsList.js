import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { Table, Button, Container, Row, Col, Card } from 'react-bootstrap';

import BusinessNav from './BusinessNav';
import BusinessForm from './Form';
import SelectedMeal from './SelectedMeal'

import { addMeal, getMeals } from '../../actions/mealActions';
import Chicken from '../../img/chicken.jpg';

class MealsList extends Component {
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
		const { meal } = this.props.meal;

		return (
			<div>
				
				<div>
				
							<Table striped bordered hover>
								<thead>
									<tr>
										<th className="center-align">Picture</th>
										<th className="center-align">Description</th>
										<th className="center-align">Vegan</th>
										<th className="center-align">Select</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="center-align"> Picture </td>
										<td className="center-align"> Description here</td>
										<td className="center-align"> Type</td>
										<td className="center-align">
											<Button onSubmit={this.onSelect}>Select</Button>
										</td>
									</tr>
								</tbody>
							</Table>
					
				</div>
			</div>
		);
	}
}

MealsList.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	meal: PropTypes.object.isRequired,
	addMeal: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	meal: state.meal
});

export default connect(mapStateToProps, { addMeal, getMeals, logoutUser })(MealsList);
