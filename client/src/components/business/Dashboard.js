import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { Container, Row, Col } from 'react-bootstrap';

import BusinessNav from './BusinessNav';
import BusinessForm from './BusinessForm';
import SelectedMeal from './SelectedMeal';
import Menu from './Menu';
import { addMeal } from '../../actions/mealActions';
import axios from "axios";

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			description: '',
			isVegan: '',
			isSelected: false,
			hasMeal: 0,
			errors: {},
			selectedMeal: {},
		};
	}
	componentDidMount() {
		axios
			.get('/api/meals/getone', {
				params: {
					shopid: this.props.auth.user.id
				}
			})
			.then((res) => {
				if (res.data[0]) {
					this.setState({
						...this.state,
						hasMeal: this.state.hasMeal + 1,
						selectedMeal: res.data[0]
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	onLogoutClick = (e) => {
		e.preventDefault();
		this.props.logoutUser();
	};

	onSelect = (meal) => {
		this.setState({
			...this.state,
			hasMeal: this.state.hasMeal + 1,
			selectedMeal: meal
		});
	};
	onSubmit = (e) => {
		e.preventDefault();

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
									<span style={{ fontFamily: 'monospace' }}>ReadyEats Business</span>
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
						<Menu
							onSelect={this.onSelect.bind(this)}
						/>
					</Col>
					<Col md={{ span: 3 }}>
						{(this.state.hasMeal !== 0) && <SelectedMeal meal={this.state.selectedMeal} />}
					</Col>
				</Row>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	meal: state.meal
});

export default connect(mapStateToProps, { addMeal, logoutUser })(Dashboard);
