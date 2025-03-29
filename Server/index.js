const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./src/db/connection.js");
dotenv.config();

const app = express();

const allowedOrigins = [
  "https://airosphere.vercel.app",
  "http://localhost:5174",
];

const corsOptionss = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET, POST, PUT, DELETE, HEAD",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  next();
});

app.use(cors(corsOptionss));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//IMPORT ROUTES
const userRouter = require("./src/routes/userRouter.js");
const authenticationRoute = require("./src/routes/authenticationRoute.js");
const issueRouter = require("./src/routes/issueRoute.js");

app.use("/user", userRouter);
app.use("/auth", authenticationRoute);
app.use("/issue", issueRouter);

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
