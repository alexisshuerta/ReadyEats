import React, { Component } from "react";

class Waiting extends Component {
    render() {
        return (
            <div>
                <div style={{ height: "75vh" }} className="container align-wrapper">
                    <div className="row">
                        <div className="col s12 center-align">
                            <h4>
                                Please come back after 5PM to reserve a meal.
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Waiting;