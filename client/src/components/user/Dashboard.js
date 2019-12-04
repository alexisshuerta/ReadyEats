import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import UserNav from "./UserNav";
import moment from "moment";
import axios from "axios";

import MealGrid from "./MealGrid";
import Waiting from "./Waiting";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      reservedMeal: {},
      currTime: moment().hour()
    };
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  handleReserve = (value) => {
    const result = {
      mealid: value,
      userid: this.props.auth.user.id,
      username: this.props.auth.user.name
    };

    axios
      .post('/api/reservations/reserve', result)
      .then((res) => {
        this.setState({
          ...this.state,
          reservedMeal: res.data.document
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    axios
      .get('/api/reservations/getreservation', {
        params: {
          userid: this.props.auth.user.id
        }
      })
      .then((res) => {
        if (res.data[0]) {
          this.setState({
            ...this.state,
            reservedMeal: res.data[0]
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    this.intervalID = setInterval(() => {
      this.setState({
        ...this.state,
        currTime: moment().hour()
      });
    }, 1000 * 60);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    const { user } = this.props.auth;

    return (
      <div>
        <UserNav />
        <div style={{ height: "75vh" }} className="container align-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              <h4>
                <b>Hey there,</b> {user.name}
                <p className="flow-text grey-text text-darken-1">
                  You are logged into{" "}
                  <span style={{ fontFamily: "monospace" }}>
                    ReadyEats Consumer
                </span>{" "}
                </p>
              </h4>
            </div>
          </div>
          {}
          {(this.state.currTime >= 16 || this.state.currTime <= 9) ?
            <MealGrid
              currTime={this.state.currTime}
              handleReserve={this.handleReserve.bind(this)}
              reservedMeal={this.state.reservedMeal}
            />
            : <Waiting />}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
