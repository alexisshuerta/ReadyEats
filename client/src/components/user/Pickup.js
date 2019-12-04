import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { Table, Button, Container, Row, Col, Card, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import UserNav from './UserNav';

import Timer from './Timer';
import axios from 'axios';

class Pickup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			meal: [],
			pickup: false
		};
	}

	onLogoutClick = (e) => {
		e.preventDefault();
		this.props.logoutUser();
	};

	componentDidMount() {
		axios
			.get('/api/reservations/pickup')
			.then((res) => {
				console.log(res.data.meal);
				if (res.data.meal) {
					this.setState({
						...this.state,
						meal: res.data.meal
					});
					this.setState({ pickup: true });
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	/* 
	React.useEffect(() => {
		if (customer != null) {
			axios
				.get('/api/reservations/getreservation', {
					params: {
						customerID: customer.id
					}
				})
				.then((res) => {
					setPickup(res.data.customer);
					console.log(res.data.customer);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			console.log('there is no customer');
		}
	}, []); */
	render() {
		const { user } = this.props.auth;

		return (
			<div>
				<UserNav />
				<Container fluid>
					<Row style={{ width: '1000px' }}>
						<Col>
							<h4>
								<b>Hello </b> {user.name}
							</h4>
						</Col>
					</Row>
				</Container>
				{this.pickup ? (
					<Fragment>
						<Row>
							<Col>
								<Table striped bordered hover>
									<thead>
										<tr>
											<th className="center-align">Name</th>
											<th className="center-align">Code</th>

											<th className="center-align">Description</th>
											<th className="center-align">Dietary</th>
											<th className="center-align">Pickup</th>
										</tr>
									</thead>

									<tbody>
										{this.state.meal.map((order, index) => (
											<tr key={index}>
												<td className="center-align"> {order.name} </td>
												<td className="center-align">
													<img src={order.imagePath} style={{ width: 200, height: 100 }} />
												</td>

												<td className="center-align"> {order.description} </td>
												<td className="center-align"> {order.type} </td>
												<td className="center-align">
													<Button onClick={this.onPickup}>Select</Button>
												</td>
											</tr>
										))}
									</tbody>
								</Table>
							</Col>
						</Row>
						<Row>
							<Timer />
						</Row>
					</Fragment>
				) : (
					<Fragment>
						<h2>SORRY, YOU DID NOT RESERVE A MEAL YET</h2>
					</Fragment>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Pickup);
