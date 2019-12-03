import React, { Component } from "react";

// Card imports
import Button from "@material-ui/core/Button";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

class MealCard extends Component {
  render() {
    const { meal } = this.props;
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
              {meal.name}
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
