import React, { Component } from "react";

// Card imports
import Button from "@material-ui/core/Button";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { CircularProgress } from '@material-ui/core';

class MealCard extends Component {
  render() {
    const { meal, onSelect, selectedMeal } = this.props;
    return (
      <div style={{ height: "50vh" }} className="container align-wrapper">
        <Card>
          {meal.imagePath ? (
            <CardMedia
              style={{ paddingTop: "64%", objectFit: 'contain' }}
              image={meal.imagePath}
              title="Burrito"
            />
          ) : (
              <CircularProgress />
            )}

          <CardContent style={{ height: "20vh" }}>
            <Typography gutterBottom variant="h5" component="h5">
              {meal.name}
            </Typography>
            <Typography component="h1"><b>{meal.shopName}</b></Typography>
            <Typography component="p">{meal.description}</Typography>
            <br></br>
            <Typography component="p">{meal.type}</Typography>

          </CardContent>
          {!(this.props.selectedMeal.isPickedup) && <CardActions>
            {((this.props.currTime >= 17) || (this.props.currTime <= 9)) && (selectedMeal.itemID !== meal._id) && <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={() => { onSelect(meal._id) }}
            >
              Reserve
            </Button>}
            {(selectedMeal.itemID === meal._id) && <Button
              size="medium"
              color="secondary"
              variant="contained"
              disabled={!((this.props.currTime >= 11) || (this.props.currTime <= 14))}
              onClick={() => { this.props.handlePickup() }}
            >
              Pickup
            </Button>}
          </CardActions>}
        </Card>
      </div >
    );
  }
}

export default MealCard;
