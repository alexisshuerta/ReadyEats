import React, { Fragment } from 'react';
import { Table, Card } from 'react-bootstrap';

export default function Menu(props) {
	const meal = props.meal;
	/*const [meal, setMeal] = React.useState({ imagePath: "" });

	React.useEffect(() => {
		axios
			.get('/api/meals/getone', {
				params: {
					shopid: business.id
				}
			})
			.then((res) => {
				if (res.data[0]) { setMeal(res.data[0]) }
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);*/

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
							<Card style={{ width: '26rem', objectFit: 'contain', justify: 'center' }}>
								<Card.Img variant="top" src={meal.imagePath} />
								<Card.Body>
									<Card.Title>{meal.name}</Card.Title>
									<Card.Text>{meal.description}</Card.Text>
								</Card.Body>
							</Card>
						</td>
					</tr>
				</tbody>
			</Table>
		</Fragment>
	);
}
