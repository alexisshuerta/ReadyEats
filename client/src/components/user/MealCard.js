import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

// Card imports
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { green } from "@material-ui/core/colors";
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// -----------------------------------------------------

class MealCard extends Component {
  render() {
    const styles = theme => ({
      root: {
        padding: theme.spacing(1),
        [theme.breakpoints.down("sm")]: {
          height: "100vh"
        },
        [theme.breakpoints.up("md")]: {
          height: "50vh"
        },
        [theme.breakpoints.up("lg")]: {
          height: "1vh"
        }
      }
    });
    return (
      <div style={{ height: "50vh" }} className="container align-wrapper">
        <Card>
          <CardMedia
            style={{ paddingTop: "64%" }}
            image={require("../../img/burrito.jpg")}
            title="Burrito"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h5">
              {this.props.mealName}
            </Typography>
            <Typography component="p">Super Taqueria</Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              href="https://www.google.com/"
              target="_blank"
            >
              Go to google
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default MealCard;
