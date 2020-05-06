const db = require("../models");

module.exports = app => {
    app.get("/api/employees", (req, res) => {
        db.Employee.find({}).then(result => {
            res.json(result);
        }).catch(err => {
            res.json(err);
        });
    });
}