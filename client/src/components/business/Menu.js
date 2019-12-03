import React, { Fragment } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';
const moment = require("moment");

export default function Menu(props) {
	const business = useSelector((state) => state.auth.user);
	const [menu, setMenu] = React.useState([]);
	const date = moment().hour();

	//cross the meal that selected
	const getStyle = () => {
		return {
			background: '#f4f4f4',
			padding: '10px',
			borderBottom: '1px #ccc dotted'
			// textDecoration: onSelected ? 'line-through' : 'none'
		};
	};

	//get the list of meal
	React.useEffect(() => {
		axios
			.get('/api/menu/get', {
				params: {
					shopid: business.id
				}
			})
			.then((res) => {
				setMenu(res.data.menu);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [business.id]);

	const onSelected = (event) => {
		const result = {
			itemid: event
		};

		axios
			.post('/api/meals/setmeal', result)
			.then((res) => {
				console.log(res.data);
				props.onSelect(res.data.document);
			})
			.catch((err) => {
				console.log(err);
			});
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
									<img src={item.imagePath} alt="" style={{ width: 200, height: 100, objectFit: 'contain' }} />
								</td>

								<td className="center-align"> {item.description} </td>
								<td className="center-align"> {item.type} </td>
								<td className="center-align">
									{(date >= 14) && (date <= 17) && <Button onClick={() => onSelected(item._id)}>Select</Button>}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Fragment>
		</div>
	);
}
