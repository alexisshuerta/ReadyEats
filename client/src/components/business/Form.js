import React, { Component, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { addMeal, getMeals } from '../../actions/mealActions';
import { Button, Container, Row, Col, Table, Form, Image } from 'react-bootstrap';
import Switch from 'react-switch';
import Dropzone from '../layout/Dropzone';
import ImageList from './ImageList';
import uuid from 'uuid';
import BusinessNav from './BusinessNav';
import Axios from 'axios';

export default function Upload(props) {
    const business = useSelector(state => state.auth.user);
    const [item, setItem] = React.useState({ shopName: business.name, shopID: business.id, name: '', description: '', type: 'meat' });
    const [mealImg, setmealImg] = React.useState(null)
    const [validated, setValidated] = React.useState(false);

    const onChange = event => {
        event.persist();
        setItem({ ...item, [event.target.name]: event.target.value });
    }

    const onFileChange = event => {
        setmealImg(event.target.files[0]);
    }

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === true) {
            setValidated(true);
            const newItem = new FormData();

            newItem.append('imageData', mealImg);

            for (let [key, value] of Object.entries(item)) {
                newItem.append(key, value);
            }

            axios.post("/api/menu/upload", newItem)
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                }
                );
        } else {
            console.log("missing form fields");
        }
    };
		return (
			<div>
				
				<Form noValidate validated={validated} onSubmit={this.onSubmit}>
					<Table striped bordered hover responsive>
						<thead>
							<tr>
								<th>Name</th>
								<th>Picture</th>
								<th>Description</th>
								<th>Vegan</th>
								<th>Select</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<input onChange={onChange} value={item.name} id="name" type="text" />
								</td>
								<td>
									<Image src="holder.js/171x180" rounded />

									<Dropzone onDrop={this.Drop} accept={'image/*'} />
								</td>
								<td>
									<input
										onChange={this.onChange}
										value={this.state.description}
										id="description"
										type="text"
									/>
								</td>

								<td>
									<Switch
										checked={this.state.isVegan}
										onChange={this.toggleChange}
										onColor="#86d3ff"
										onHandleColor="#2693e6"
										handleDiameter={30}
										uncheckedIcon={false}
										checkedIcon={false}
										boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
										activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
										height={20}
										width={48}
										className="react-switch"
										id="material-switch"
									/>
								</td>
								<td>
									<Button type="submit">Submit</Button>
								</td>
							</tr>
						</tbody>
					</Table>
				</Form>
			</div>
		);
	}
}


