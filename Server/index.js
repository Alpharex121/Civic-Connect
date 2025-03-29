const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Initialize environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
