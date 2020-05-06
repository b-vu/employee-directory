import React, { Component } from "react";
import API from "../utils/API";

class Directory extends Component {
    state = {
        result: {}
    }

    componentDidMount = () => {
        this.getEmployee();
    }

    getEmployee = () => {
        console.log("here1");
        API.getEmployees().then(result => {
            console.log("here2");
            console.log(result);
            this.setState({
                result: result
            })
        });
    }

    render() {
        return(
            <div className="container">
                {this.state.result}
            </div>
        );
    }
}

export default Directory;