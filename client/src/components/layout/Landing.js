import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Image, Container, Row, Col, Figure, Jumbotron } from "react-bootstrap";
import Choose from "../../img/icon_1-choose.png";
import Pickup from "../../img/icon_2-pickup.png";
import Eat from "../../img/icon_3-eat.png";
import Footer from "./Footer"

class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Preorder</b> from local restaurants with{" "}
              <span style={{ fontFamily: "monospace" }}>ReadyEats</span> today.
            </h4>
            <p className="flow-text grey-text text-darken-1">
              Eat better food for cheaper.
            </p>
            <br />
            <Container>
              <Row>
                <Col xs={6} md={4}>
                  <Figure>
                    <Figure.Image
                      width={171}
                      height={180}
                      src={Choose}
                    />
                    <Figure.Caption>
                      CHOOSE
                                 </Figure.Caption>
                  </Figure>
                </Col>
                <Col xs={6} md={4}>
                  <Figure>
                    <Figure.Image
                      width={171}
                      height={180}
                      src={Pickup}
                    />
                    <Figure.Caption>
                      PICK UP
                                 </Figure.Caption>
                  </Figure>
                </Col>
                <Col xs={6} md={4}>
                  <Figure>
                    <Figure.Image
                      width={171}
                      height={180}
                      src={Eat}
                    />
                    <Figure.Caption>
                      EAT
                                 </Figure.Caption>
                  </Figure>
                </Col>
              </Row>


            </Container>
            <Jumbotron>
              <Footer />
            </Jumbotron>

          </div>

        </div>

      </div >

    );
  }
}

export default Landing;