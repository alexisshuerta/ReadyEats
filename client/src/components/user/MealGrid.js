import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

// import * as contentful from "contentful";
import MealCard from "./MealCard";

class MealGrid extends Component {
  constructor() {
    super();
    this.state = {
      meals: [
        { mealName: "Burrito", id: 1 },
        { mealName: "Salad", id: 2 },
        { mealName: "Taco Salad", id: 3 },
        { mealName: "Burrito", id: 4 },
        { mealName: "Salad", id: 5 },
        { mealName: "Taco Salad", id: 6 }
      ],
      selectedMeal: ""
    };
  }

  //   getMeals = () => {};

  onSelect = () => {
    const type = 'Salad';
    var final = this.state.meals.reduce(function (arr, v) {
      if (v.mealName === type) return [v].concat(arr)
      arr.push(v)
      return arr
    }, []);
    this.setState({
      ...this.state,
      meals: final,
      selectedMeal: type
    });
    console.log(this.state.selectedMeal);
  }

  render() {
    return (
      <div>
        <div><Button onClick={this.onSelect}>BUTTON</Button></div>
        {this.state.meals ? (
          <div>
            <Grid
              container
              justify="space-evenly"
              spacing={8}
              alignItems="baseline"
              style={{ padding: 12 }}
            >
              {this.state.meals.map(currentMeal => (
                <Grid key={currentMeal.id} item xs={12} sm={6} lg={4} xl={3}>
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
