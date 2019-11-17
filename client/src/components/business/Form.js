import React, { Component, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { Button, Container, Row, Col, Table } from 'react-bootstrap';
import Switch from 'react-switch';
import Dropzone from '../layout/Dropzone';
import uuid from 'uuid';
import BusinessNav from './BusinessNav';

class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			description: '',
			isVegan: false
		};
		this.toggleChange = this.toggleChange.bind(this);
	}

	onDrop = (acceptedFiles) => {
		acceptedFiles.map((file) => {
			const reader = new FileReader();

			reader.readAsDataURL(file);
			return file;
		});
	};

	onSubmit = (e) => {
		e.preventDefault();
		this.props.addTodo(this.state.title);
		this.setState({ title: '' });
	};

	toggleChange = (e) => {
		this.setState({ isBusiness: e });
	};

	handleChange = (event) => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	render() {
		const { user } = this.props.auth;
		return (
			<div className="Restaurants">
				<BusinessNav />
				<Container fluid>
					<row style={{ width: '3000px' }}>
						<Col>
							<h4>
								<b>Hey there,</b> {user.name}
								<p className="flow-text grey-text text-darken-1">Enter your new meal to the list</p>
							</h4>
						</Col>
					</row>
				</Container>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Picture</th>
							<th>Description</th>
							<th>Vegan</th>
							<th>Select</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<Dropzone onDrop={this.onDrop} />
							</td>
							<td onChange={this.onChange} value={this.state.description}>
								<input
									type="text"
									name="title"
									style={{ flex: '10', padding: '5px' }}
									placeholder="Description ..."
									value={this.state.title}
									onChange={this.onChange}
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
								<Button onSubmit={this.onSubmit}>Submit</Button>
							</td>
						</tr>
					</tbody>
				</Table>
			</div>
		);
	}
}

Form.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Form);
