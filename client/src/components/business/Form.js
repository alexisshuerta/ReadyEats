import React, { Component, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { addMeal, getMeals } from '../../actions/mealActions';
import { Button, Container, Row, Col, Table, Form, Image } from 'react-bootstrap';
import Switch from 'react-switch';
import Dropzone from '../layout/Dropzone';
import ImageList from './ImageList';
import uuid from 'uuid';
import BusinessNav from './BusinessNav';

class AddMealForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			description: '',
			picture: '',
			isVegan: false
		};
		this.toggleChange = this.toggleChange.bind(this);
	}

	// componentDidMount() {
	// 	this.props.getMeals();
	// }

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	onChange = (event) => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};
	onDrop = (acceptedFiles) => {
		// this callback will be called after files get dropped, we will get the acceptedFiles. If you want, you can even access the rejected files too
		console.log(acceptedFiles);
	};

	onSubmit = (e) => {
		e.preventDefault();
		const type = this.state.isVegan ? 'meat' : 'vegan';

		const mealInfo = {
			name: this.state.name,
			description: this.state.description,
			picture: this.state.picture,
			isVegan: this.state.isVegan,
			type: type
		};
		this.props.addMeal(mealInfo, this.props.history);
	};

	toggleChange = (e) => {
		this.setState({ isVegan: e });
	};

	onLogoutClick = (e) => {
		e.preventDefault();
		this.props.logoutUser();
	};

	render() {
		const { user } = this.props.auth;
		return (
			<div>
				
				<Form noValidate onSubmit={this.onSubmit}>
					<Table striped bordered hover responsive>
						<thead>
							<tr>
								<th>Name</th>
								<th>Picture</th>
								<th>Description</th>
								<th>Vegan</th>
								<th>Select</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<input onChange={this.onChange} value={this.state.name} id="name" type="text" />
								</td>
								<td>
									<Image src="holder.js/171x180" rounded />

									<Dropzone onDrop={this.Drop} accept={'image/*'} />
								</td>
								<td>
									<input
										onChange={this.onChange}
										value={this.state.description}
										id="description"
										type="text"
									/>
								</td>

								<td>
									<Switch
										checked={this.state.isVegan}
										onChange={this.toggleChange}
										onColor="#86d3ff"
										onHandleColor="#2693e6"
										handleDiameter={30}
										uncheckedIcon={false}
										checkedIcon={false}
										boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
										activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
										height={20}
										width={48}
										className="react-switch"
										id="material-switch"
									/>
								</td>
								<td>
									<Button type="submit">Submit</Button>
								</td>
							</tr>
						</tbody>
					</Table>
				</Form>
			</div>
		);
	}
}

AddMealForm.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	addMeal: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	meal: state.meal
});

export default connect(mapStateToProps, { logoutUser, addMeal })(AddMealForm);
//export default connect(mapStateToProps, { logoutUser, addMeal, getMeals })(AddMealForm);
