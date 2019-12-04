import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import UserNav from "./UserNav";
import moment from "moment";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Countdown from "react-countdown-now";

import MealGrid from "./MealGrid";
import Waiting from "./Waiting";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      reservedMeal: {},
      currTime: moment().hour(),
      open: false,
      timer: 0,
      pickedup: false
    };
  }

  handleOpen = () => {
    this.setState({
      ...this.state,
      open: true
    });
  }

  handleClose = () => {
    this.setState({
      ...this.state,
      open: false
    });
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

  handlePickup = () => {
    axios
      .get('/api/reservations/pickup', {
        params: {
          userid: this.props.auth.user.id
        }
      })
      .then((res) => {
        if (res.data) {
          this.setState({
            ...this.state,
            reservedMeal: res.data,
            pickedup: true
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <span>Thank you for picking up your meal.</span>
    } else {
      return <span>{minutes}:{seconds}</span>
    }
  }

  createTimer = () => {
    return (
      <div style={{ fontSize: 24 }}>
        <Countdown
          date={Date.now() + 180000}
          renderer={this.renderer}
          zeroPadTime={0}
        />
      </div>
    )
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
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle>{"Meal Pickup"}</DialogTitle>
            <DialogContent>
              {!(this.state.pickedup) &&
                <DialogContentText>
                  Are you sure you are ready to pickup your meal?
                </DialogContentText>}
              {(this.state.pickedup) &&
                <DialogContentText>
                  Please pick up your meal within the next 3 minutes.<br />
                  Your confirmation code is:<br /><br />
                  <div style={{ fontSize: 36 }}>{this.state.reservedMeal.code}</div>
                </DialogContentText>}
              {(this.state.pickedup) && this.createTimer()}
              {!(this.state.pickedup) &&
                <DialogActions>
                  <Button onClick={this.handleClose}>
                    Cancel
                  </Button>
                  <Button onClick={this.handlePickup}>
                    Confirm
                  </Button>
                </DialogActions>}
            </DialogContent>
          </Dialog>
          {(this.state.currTime >= 16 || this.state.currTime <= 9) ?
            <MealGrid
              currTime={this.state.currTime}
              handleReserve={this.handleReserve.bind(this)}
              reservedMeal={this.state.reservedMeal}
              handlePickup={this.handleOpen.bind(this)}
            />
            : <Waiting />}
        </div>
      </div >
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
