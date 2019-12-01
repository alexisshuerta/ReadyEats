import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { Table, Button, Container, Row, Col, Card } from 'react-bootstrap';

import { useSelector } from 'react-redux';
import axios from 'axios';

import BusinessNav from './BusinessNav';
import BusinessForm from './BusinessForm';

import { addMeal, getMeals } from '../../actions/mealActions';
import Chicken from '../../img/chicken.jpg';

export default function Menu(props) {
	const business = useSelector((state) => state.auth.user);
	const [ meal, setMeal ] = React.useState({});

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
			.get('/api/meals/getone', {
				params: {
					shopid: business.id
				}
			})
			.then((res) => {
				setMeal(res.data[0]);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const remove = (event) => {
		axios
			.delete(`/api/meals/${event}`)
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	};

	return (
		<Fragment>
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
								<Card.Img variant="top" src={meal.imagePath} />
								<Card.Body>
									<Card.Title>{meal.name}</Card.Title>
									<Card.Text>{meal.description}</Card.Text>
									<Button variant="primary" onClick={() => remove(meal._id)}>
										Remove
									</Button>
								</Card.Body>
							</Card>
						</td>
					</tr>
				</tbody>
			</Table>
		</Fragment>
	);
}
