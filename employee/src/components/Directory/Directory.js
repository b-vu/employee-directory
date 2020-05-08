import React, { Component } from "react";
import EmployeeList from "../EmployeeList/EmployeeList";
import API from "../../utils/API";
import "./DirectoryStyle.css";

class Directory extends Component {
    state = {
        results: [],
        searchResults: [],
        filterResults: [],
        searchAndFilterResults: [],
        searchTerm: "",
        filter: ""
    }

    counter = 0;

    componentDidMount = () => {
        this.displayEmployees();
    }

    displayEmployees = () => {
        API.getEmployees().then(results => {
            this.setState({
                results: results.data.results,
                searchResults: results.data.results
            })
        });
    }

    handleInputChange = event => {
        const { name, value } = event.target;

        let employees;

        if(!this.state.filter.length){
            console.log("first: results");
            employees = [...this.state.results];
        }
        else if(value.length && this.state.filter.length){
            console.log("second: filterResults")
            employees = [...this.state.filterResults];
        }
        else if(!value.length && !this.state.filter.length){
            console.log("third: results")
            employees = [...this.state.results];
        }
        else if(!value.length && !this.state.filterResults.length){
            console.log("fourth: searchResults")
            employees = [...this.state.searchResults];
        }
        else if(!value.length) {
            console.log("fifth: filterResults")
            employees = [...this.state.filterResults];
        }

        const filteredArray = employees.filter(employee =>
            employee.name.first.toLowerCase().includes(value.toLowerCase()) ||
            employee.name.last.toLowerCase().includes(value.toLowerCase()) ||
            (employee.name.first.toLowerCase() + " " + employee.name.last.toLowerCase()).includes(value.toLowerCase()) ||
            (employee.name.first.toLowerCase() + employee.name.last.toLowerCase()).includes(value.toLowerCase()) ||
            employee.email.toLowerCase().includes(value.toLowerCase()) ||
            employee.cell.includes(value) ||
            employee.login.username.toLowerCase().includes(value.toLowerCase())
        );

        this.setState({
            searchResults: filteredArray,
            [name]: value.toLowerCase()
        })
    }

    handleFilterChange = event => {
        const { value } = event.target;
        let stateArray;

        if(!this.state.searchTerm.length){
            stateArray = [...this.state.results];
        }
        else if(this.state.searchTerm.length){
            stateArray = [...this.state.searchResults];
        }
        else{
            stateArray = [...this.state.searchResults];
        }

        switch (value) {
            case "First Name":
                stateArray.sort((a, b) => {
                    const firstNameA = a.name.first.toLowerCase();
                    const firstNameB = b.name.first.toLowerCase();
                    return (firstNameA < firstNameB) ? -1 : (firstNameA > firstNameB) ? 1 : 0;
                })
                break;

            case "Last Name":
                stateArray.sort((a, b) => {
                    const lastNameA = a.name.last.toLowerCase();
                    const lastNameB = b.name.last.toLowerCase();
                    return (lastNameA < lastNameB) ? -1 : (lastNameA > lastNameB) ? 1 : 0;
                })
                break;

            case "Email":
                stateArray.sort((a, b) => {
                    const emailA = a.email.toLowerCase();
                    const emailB = b.email.toLowerCase();
                    return (emailA < emailB) ? -1 : (emailA > emailB) ? 1 : 0;
                })
                break;

            case "Phone Number":
                stateArray.sort((a, b) => {
                    const numberA = a.cell.toLowerCase();
                    const numberB = b.cell.toLowerCase();
                    return (numberA < numberB) ? -1 : (numberA > numberB) ? 1 : 0;
                })
                break;

            case "Username":
                stateArray.sort((a, b) => {
                    const usernameA = a.login.username.toLowerCase();
                    const usernameB = b.login.username.toLowerCase();
                    return (usernameA < usernameB) ? -1 : (usernameA > usernameB) ? 1 : 0;
                })
                break;

            default:
                break;
        }

        this.setState({
            filterResults: stateArray,
            filter: value
        })
    }

    render() {
        console.log(this.state);
        let resultsArray;

        if(!this.state.searchTerm.length && !this.state.filter.length){
            console.log("using results")
            resultsArray = this.state.results;
        }
        else if(this.state.filter.length && this.state.searchTerm.length){
            console.log("using filter and search")
            resultsArray = this.state.searchResults;
        }
        else if(this.state.filter.length) {
            console.log("using filter")
            resultsArray = this.state.filterResults;
        }
        else{
            console.log("using search")
            resultsArray = this.state.searchResults;
        }

        return(
            <div className="container">
                <input className="input" placeholder="Search employees" name="searchTerm" onChange={this.handleInputChange}></input>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Sort By
                    </button>
                    {
                        this.state.filter.length
                        ?
                        <div>
                            <br/>
                            <p>Sorted By {this.state.filter}</p>
                        </div>
                        :
                        null
                    }
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <option className="dropdown-item" name="filter" value="First Name" onClick={this.handleFilterChange}>First Name</option>
                        <option className="dropdown-item" name="filter" value="Last Name" onClick={this.handleFilterChange}>Last Name</option>
                        <option className="dropdown-item" name="filter" value="Email" onClick={this.handleFilterChange}>Email</option>
                        <option className="dropdown-item" name="filter" value="Phone Number" onClick={this.handleFilterChange}>Phone Number</option>
                        <option className="dropdown-item" name="filter" value="Username" onClick={this.handleFilterChange}>Username</option>
                        <option className="dropdown-item" name="filter" value="" onClick={this.handleFilterChange}>No Filter</option>
                    </div>
                </div>
                {
                    !this.state.searchTerm.length
                    ?
                    resultsArray.map(employee => 
                        <EmployeeList employee={employee} key={this.counter++}></EmployeeList>
                    )
                    :
                    resultsArray.map(employee => 
                        <EmployeeList employee={employee} key={this.counter++}></EmployeeList>
                    )
                }
            </div>
        );
    }
}

export default Directory;