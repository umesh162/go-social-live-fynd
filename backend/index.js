const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

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

// --------deploying Application -----------

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`
  http://localhost:${port}/ 
  `);
});
