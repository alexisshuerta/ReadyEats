import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logoutUser } from '../../actions/authActions';

class BusinessNav extends Component {
	static propTypes = {
		isAuthenticated: PropTypes.bool
	};
	onLogoutClick = (e) => {
		e.preventDefault();
		this.props.logoutUser();
	};

	render() {
		return (
			<div className="navbar-fixed">
				<Navbar collapseOnSelect expand="lg" bg="primary" variant="light">
					<Navbar.Brand className="material-icons">fastfood </Navbar.Brand>
					<Navbar.Brand href="/businessdashboard">ReadyEats</Navbar.Brand>

					<Nav.Link href="/businessdashboard/pickup">Pickup</Nav.Link>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="mr-auto" />
						<Nav>
							<Nav.Link onClick={this.onLogoutClick} href="/">
								Logout
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}
BusinessNav.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(BusinessNav);
