const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/employee",
  { useNewUrlParser: true }
);

const employeeSeed = [
    {
        name: "Hugo Byron",
        title: "Caster",
        email: "hugobyron@csgo.com"
    },
    {
        name: "Hugo Byron",
        title: "Caster",
        email: "hugobyron@csgo.com"
    },
    {
        name: "Hugo Byron",
        title: "Caster",
        email: "hugobyron@csgo.com"
    },
    {
        name: "Hugo Byron",
        title: "Caster",
        email: "hugobyron@csgo.com"
    },
    {
        name: "Hugo Byron",
        title: "Caster",
        email: "hugobyron@csgo.com"
    }
];

db.Employee.deleteMany({})
  .then(() => db.Employee.collection.insertMany(employeeSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
});