import React, { Component, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { Button, Container, Row, Col, Table, Card } from 'react-bootstrap';
import BusinessNav from './BusinessNav';

import ReactTable from 'react-table';
import 'react-table/react-table.css';
import withFixedColumns from 'react-table-hoc-fixed-columns';
import 'react-table-hoc-fixed-columns/lib/styles.css'; // important: this line must be placed after react-table css import

const ReactTableFixedColumns = withFixedColumns(ReactTable);

class Pickup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			description: '',
			isVegan: false,
			isPickedUP: false
		};
	}

	handleChange = (event) => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	getStyle = () => {
		return {
			textDecoration: this.state.isPickedUP ? 'line-through' : 'none'
		};
	};

	onChange = (e) => {
		this.setState({ isPickedUP: true });
	};

	render() {
		const { user } = this.props.auth;
		return (
			<div>
				<BusinessNav />
				<Container fluid>
					<row style={{ width: '3000px' }}>
						<Col>
							<h4>
								<b>Hey there,</b> {user.name}
								<p className="flow-text grey-text text-darken-1">Your list of customert</p>
							</h4>
						</Col>
					</row>
				</Container>
				<div>
					<Row>
						<Col xl={8}>
							<Table striped bordered hover>
								<thead static={true}>
									<tr>
										<th>Code</th>
										<th>Customer Name</th>
										<th>Vegan</th>
										<th>Select</th>
									</tr>
								</thead>
								<tbody style={this.getStyle()}>
									<tr>
										<td textDecoration="line-through">Code here </td>
										<td style={this.getStyle()}>Customer Name here</td>
										<td style={this.getStyle()}>Vegan or not</td>
										<td>
											<Button onChange={this.onChange}>Select</Button>
										</td>
									</tr>
								</tbody>
							</Table>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}

Pickup.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Pickup);
