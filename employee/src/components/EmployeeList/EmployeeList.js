import React from "react";
import "./EmployeeListStyle.css";

const EmployeeList = props => {
    const { cell, email, name, picture, login } = props.employee;

    return(
    <div className="row">
        <img className="col-sm-2" src={picture.large} alt={name.first + " " + name.last}></img>
        <div className="col-sm-10">
            <p>Name: <span>{name.first} {name.last}</span></p>
            <p>Email: <span>{email}</span></p>
            <p>Phone Number: <span>{cell}</span></p>
            <p>Username: <span>{login.username}</span></p>
        </div>
    </div>
    )
}

export default EmployeeList;