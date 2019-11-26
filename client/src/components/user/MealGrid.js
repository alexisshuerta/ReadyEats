import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

// import * as contentful from "contentful";
import MealCard from "./MealCard";

class MealGrid extends Component {
  state = {
    meals: [
      { mealName: "Burrito" },
      { mealName: "Salad" },
      { mealName: "Taco Salad" },
      { mealName: "Burrito" },
      { mealName: "Salad" },
      { mealName: "Taco Salad" }
    ],
    searchString: ""
  };

  constructor() {
    super();
    // this.getMeals();
  }

  //   getMeals = () => {};

  render() {
    return (
      <div>
        {this.state.meals ? (
          <div>
            <Grid
              container
              justify="space-evenly"
              spacing={24}
              alignItems="baseline"
              style={{ padding: 12 }}
            >
              {this.state.meals.map(currentMeal => (
                <Grid item xs={12} sm={6} lg={4} xl={3}>
                  <MealCard mealName={currentMeal.mealName} />
                </Grid>
              ))}
            </Grid>
          </div>
        ) : (
          "No meals yet"
        )}
      </div>
    );
  }
}

export default MealGrid;
