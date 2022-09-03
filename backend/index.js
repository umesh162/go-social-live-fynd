const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();
const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes");
var cors = require("cors");

mongoose
  .connect(process.env.MONGO_URI)
  .then(console.log("db Connected"))
  .catch((err) => console.log(err));

// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(cookieParser());
app.use("/", routes());

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`
  http://localhost:${port}/ 
  `);
});
