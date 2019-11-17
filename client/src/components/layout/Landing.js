import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Container, Row, Col, Figure, Jumbotron, Carousel } from 'react-bootstrap';
import Choose from '../../img/icon_1-choose.png';
import Pickup from '../../img/icon_2-pickup.png';
import Eat from '../../img/icon_3-eat.png';
import Footer from './Footer';
import Navbar from './Navbar';
import Chicken from '../../img/chicken.jpg';
import Burrito from '../../img/burrito.jpg';
import Pesto from '../../img/pesto.jpg';

class Landing extends Component {
	render() {
		return (
			<div>
				<Navbar />
				<div style={{ height: '75vh' }} className="col s12 center-align">
					<h4>
						<b>Preorder</b> from local restaurants with{' '}
						<span style={{ fontFamily: 'monospace' }}>ReadyEats</span> today.
					</h4>
					<p className="flow-text grey-text text-darken-1">Eat better food for cheaper.</p>
					<br />
					<div style={{ height: '30vh' }} className="col s6">
						<Link
							to="/register"
							style={{
								width: '140px',
								borderRadius: '3px',
								letterSpacing: '1.5px'
							}}
							className="btn btn-large waves-effect waves-light hoverable blue accent-3"
						>
							Register
						</Link>

						<Link
							to="/login"
							style={{
								width: '140px',
								borderRadius: '3px',
								letterSpacing: '1.5px'
							}}
							className="btn btn-large btn-flat waves-effect white black-text"
						>
							Log In
						</Link>
					</div>

					<div>
						<Row>
							<Col xs={6} md={4}>
								<Figure>
									<Figure.Image width={171} height={180} src={Choose} />
									<Figure.Caption>CHOOSE</Figure.Caption>
								</Figure>
							</Col>
							<Col xs={6} md={4}>
								<Figure>
									<Figure.Image width={171} height={180} src={Pickup} />
									<Figure.Caption>PICK UP</Figure.Caption>
								</Figure>
							</Col>
							<Col xs={6} md={4}>
								<Figure>
									<Figure.Image width={171} height={180} src={Eat} />
									<Figure.Caption>EAT</Figure.Caption>
								</Figure>
							</Col>
						</Row>
					</div>
					<div>
						<Jumbotron className="static">
							<Footer />
						</Jumbotron>
					</div>
				</div>
			</div>
		);
	}
}

export default Landing;
