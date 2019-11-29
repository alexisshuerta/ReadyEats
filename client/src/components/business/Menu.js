import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { Table, Button, Container, Row, Col, Card, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function Menu(props) {
	const business = useSelector((state) => state.auth.user);
	const [ menu, setMenu ] = React.useState([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ]);

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

	const [ item ] = React.useState([ 1 ]);

	const onSelected = (event) => {
		axios
			.post('/api/meals/setmeal', event)
			.then((res) => {
				console.log(res.data.item);
			})
			.catch((err) => {
				console.log(err);
			});
		console.log('unable to process');
	};

	return (
		<div style={getStyle()}>
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
						{menu.map((item, index) => (
							<tr key={index}>
								<td className="center-align"> {item.name} </td>
								<td className="center-align">
									<img src={item.imagePath} style={{ width: 200, height: 100 }} />
								</td>

								<td className="center-align"> {item.description} </td>
								<td className="center-align"> {item.type} </td>
								<td className="center-align">
									<Button onSubmit={onSelected(index)}>Select</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Fragment>
		</div>
	);
}
