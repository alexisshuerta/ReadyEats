import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

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
    };
  }

  componentDidMount() {
    axios
      .get('/api/meals/get')
      .then((res) => {
        if (res.data.meals) {
          this.setState({
            ...this.state,
            meals: res.data.meals
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  orderList = (list, value) => {
    let final = list.reduce(function (arr, v) {
      if (v._id === value) return [v].concat(arr)
      arr.push(v)
      return arr
    }, []);
    return final;
  }

  onSelect = (value) => {
    /*var final = this.orderList(this.state.meals, value);
    this.setState({
      ...this.state,
      meals: final,
    });*/
    this.props.handleReserve(value);
  }

  render() {
    const orderedMeal = this.orderList(this.state.meals, this.props.reservedMeal.itemID);

    return (
      <div>
        {this.state.meals ? (
          <div>
            <Grid
              container
              justify="flex-start"
              spacing={0}
              alignItems="center"
              style={{ padding: 8 }}
            >
              {orderedMeal.map((currentMeal, index) => (
                < Grid key={index} item xs={12} sm={6} lg={4} xl={3} >
                  <MealCard
                    meal={currentMeal}
                    onSelect={this.onSelect}
                    selectedMeal={this.props.reservedMeal}
                    currTime={this.props.currTime}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        ) : (
            "No meals yet"
          )
        }
      </ div>
    );
  }
}

export default MealGrid;
