import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { Table, Button, Container, Row, Col, Card } from 'react-bootstrap';

import BusinessNav from './BusinessNav';
import BusinessForm from './BusinessForm';

import { addMeal, getMeals } from '../../actions/mealActions';
import Chicken from '../../img/chicken.jpg';

class SelectedMeal extends Component {
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
		return (
			<div>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th className="center-align">Meal of the day</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="center">
								<Card style={{ width: '18rem' }}>
									<Card.Img variant="top" src={Chicken} />
									<Card.Body>
										<Card.Title>Meal Name</Card.Title>
										<Card.Text>Description</Card.Text>
										<Button variant="primary">Remove</Button>
									</Card.Body>
								</Card>
							</td>
						</tr>
					</tbody>
				</Table>
			</div>
		);
	}
}

SelectedMeal.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	meal: PropTypes.object.isRequired,
	addMeal: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	meal: state.meal
});

export default connect(mapStateToProps, { addMeal, getMeals, logoutUser })(SelectedMeal);
