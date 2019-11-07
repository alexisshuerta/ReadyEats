import React, { Component } from "react";
import { Link } from "react-router-dom";
import Chicken from "../img/chicken-parmesan-hero.jpg";

class Business extends Component {
    render() {
        return (
            <div className="Restaurants">
                <div className="lander">
                    <h1>Welcome Restaurant</h1>
                    <p>Place your list of meal here</p>
                </div>

                <table>
                    <image src={Chicken} fluid />
                </table>


            </div>
        );
    }
}

export default Navbar;