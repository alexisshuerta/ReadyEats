import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Table, Row, Col } from 'react-bootstrap';
import BusinessNav from './BusinessNav';

import axios from 'axios';

class Pickup extends Component {
	constructor(props) {
		super();
		this.state = {
			customers: []
		};
	}

	componentDidMount() {
		axios
			.get('/api/reservations/get', {
				params: {
					shopid: this.props.auth.user.id
				}
			})
			.then((res) => {
				if (res.data.reservations) {
					this.setState({
						...this.state,
						customers: res.data.reservations
					});
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
		};
	};

	render() {
		return (
			<div>
				<BusinessNav />
				<Fragment>
					<Row style={this.getStyle()}>
						<Col>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th className="center-align">Customer</th>
										<th className="center-align">Code</th>

									</tr>
								</thead>

								<tbody>
									{this.state.customers.map((order, index) => (
										<tr key={index}>
											<td className="center-align"> {order.username} </td>
											<td className="center-align"> {order.code} </td>
										</tr>
									))}
								</tbody>
							</Table>
						</Col>
					</Row>
				</Fragment>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps)(Pickup);
