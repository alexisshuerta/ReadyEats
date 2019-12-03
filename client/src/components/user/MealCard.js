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
    const { meal, onSelect, selectedMeal } = this.props;
    return (
      <div style={{ height: "50vh" }} className="container align-wrapper">
        <Card>
          <CardMedia
            style={{ paddingTop: "64%", objectFit: 'contain' }}
            image={meal.imagePath}
            title="Burrito"
          />
          <CardContent style={{ height: "20vh" }}>
            <Typography gutterBottom variant="h5" component="h5">
              {meal.name}
            </Typography>
            <Typography component="h1"><b>{meal.shopName}</b></Typography>
            <Typography component="p">{meal.description}</Typography>
            <br></br>
            <Typography component="p">{meal.type}</Typography>

          </CardContent>
          <CardActions>
            {(selectedMeal !== meal._id) && <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={() => { onSelect(meal._id) }}
            >
              Reserve
            </Button>}
          </CardActions>
        </Card>
      </div >
    );
  }
}

export default MealCard;
