import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { Table, Button, Container, Row, Col, Card, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import BusinessNav from './BusinessNav';

import axios from 'axios';

export default function Menu(props) {
	const business = useSelector((state) => state.auth.user);
	const [ customer, setPickup ] = React.useState([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ]);
	const [ meal ] = React.useState([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ]);

	const getStyle = () => {
		return {
			background: '#f4f4f4',
			padding: '10px',
			borderBottom: '1px #ccc dotted'
			// textDecoration: onSelected ? 'line-through' : 'none'
		};
	};

	React.useEffect(() => {
		axios
			.get('/api/reservations/getreservation')
			.then((res) => {
				setPickup(res.data.customer);
				console.log(res.data.customer);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div>
			<BusinessNav />
			<Fragment>
				<Row style={getStyle()}>
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

							{/* 	<tbody>
								{menu.map((item, index) => (
									<tr key={index}>
										<td className="center-align"> {item.name} </td>
										<td className="center-align">
											<img src={item.imagePath} style={{ width: 200, height: 100 }} />
										</td>

										<td className="center-align"> {item.description} </td>
										<td className="center-align"> {item.type} </td>
										<td className="center-align">
											<Button>Select</Button>
										</td>
									</tr>
								))}
							</tbody> */}
						</Table>
					</Col>
					{/* <div>
					<Col>
						<Table striped bordered hover>
							<thead>
								<tr>
									<th className="center-align">Meal of the day</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="center-align">
										<Card style={{ width: '18rem' }}>
											<Card.Img variant="top" />
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
					</Col>
				</div> */}
				</Row>
			</Fragment>
		</div>
	);
}
