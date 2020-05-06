const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
// const bodyParser = require("body-parser");
// const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(logger("dev"));

app.use(compression());
// app.use(bodyParser.json());
// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/employee", {
  useNewUrlParser: true,
  useFindAndModify: false
});

app.use(require("./routes/apiRoutes"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});