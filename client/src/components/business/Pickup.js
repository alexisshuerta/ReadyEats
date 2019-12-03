import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { Table, Button, Container, Row, Col, Card, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import BusinessNav from './BusinessNav';

import axios from 'axios';

class Pickup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			customers: [],
			pickup: false
		};
	}

	componentDidMount() {
		axios
			.get('/api/reservations/getreservation')
			.then((res) => {
				console.log(res.data.customers);
				if (res.data.customers) {
					this.setState({
						...this.state,
						customers: res.data.customers
					});
					this.setState({ pickup: true });
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	getStyle = () => {
		return {
			background: '#f4f4f4',
			padding: '10px',
			borderBottom: '1px #ccc dotted'
			// textDecoration: onSelected ? 'line-through' : 'none'
		};
	};
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
		return (
			<div>
				<BusinessNav />
				{this.pickup ? (
					<Fragment>
						<Row style={this.getStyle()}>
							<Col>
								<Table striped bordered hover>
									<thead>
										<tr>
											<th className="center-align">Customer</th>
											<th className="center-align">Code</th>

											<th className="center-align">Description</th>
											<th className="center-align">Vegan</th>
											<th className="center-align">Select</th>
										</tr>
									</thead>

									<tbody>
										{this.state.customers.map((order, index) => (
											<tr key={index}>
												<td className="center-align"> {order.name} </td>
												<td className="center-align">
													<img src={order.imagePath} style={{ width: 200, height: 100 }} />
												</td>

												<td className="center-align"> {order.description} </td>
												<td className="center-align"> {order.type} </td>
												<td className="center-align">
													<Button>Select</Button>
												</td>
											</tr>
										))}
									</tbody>
								</Table>
							</Col>
						</Row>
					</Fragment>
				) : (
					<Fragment>
						<h2>SORRY, NO ORDER YET</h2>
					</Fragment>
				)}
			</div>
		);
	}
}

export default Pickup;
