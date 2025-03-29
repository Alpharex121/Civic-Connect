require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to database successfully!");
  })
  .catch((e) => {
    console.log("Error while connecting to database");
    console.log(e.message);
  });
