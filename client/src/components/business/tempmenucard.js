import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { Table, Button, Container, Row, Col, Card, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';

const getStyle = () => {
	return {
		background: '#f4f4f4',
		padding: '10px',
		borderBottom: '1px #ccc dotted'
		// textDecoration: onSelected ? 'line-through' : 'none'
	};
};

const business = useSelector((state) => state.auth.user);

class tempMenu extends Component {
	state = {
		menu: []
	};

	componentDidMount() {
		React.useEffect(() => {
			axios
				.get('/api/menu/get', {
					params: {
						shopid: business.id
					}
				})
				.then((res) => {
					setMenu(res.data.menu);
					console.log(res.data.menu);
				})
				.catch((err) => {
					console.log(err);
				});
		}, []);
	}
	render() {
		return (
            this.props.meals.map((meal) => 
				<div style={getStyle()}>
					<Col span={1}>
						<Fragment>
							
									<Table striped bordered hover>
										<thead>
											<tr>
												<th className="center-align">Name</th>
												<th className="center-align">Picture</th>

												<th className="center-align">Description</th>
												<th className="center-align">Vegan</th>
												<th className="center-align">Select</th>
											</tr>
										</thead>

										<tbody>
												<tr>
													<td className="center-align"> {meal.name} </td>
													<td className="center-align">
														<img src={meal.imagePath} style={{ width: 200, height: 100 }} />
													</td>

													<td className="center-align"> {meal.description} </td>
													<td className="center-align"> {meal.type} </td>
													<td className="center-align">
														<Button onClick={onSelected}>Select</Button>
													</td>
												</tr>
											))}
										</tbody>
									</Table>
								);
							})}
						</Fragment>
					</Col>
				</div>
				<div>
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
				</div>
        ));
	}
}
meals.propTypes = {
	meals: PropTypes.array.isRequired,
	getMeals: PropTypes.func.isRequired
};

export default tempMenu;
