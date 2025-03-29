const express = require("express");
const addUser = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/Auth");

router.get("/", auth, (req, res) => {
  //if logged in -> send current User.
  res.status(200).send(req.user);
  return;
});

router.post("/", async (req, res) => {
  try {
    const inputEmail = req.body.email;
    const inputPassword = req.body.password;

    const userCred = await addUser.findOne({ email: inputEmail });
    const passMatch = await bcrypt.compare(inputPassword, userCred.password);

    if (passMatch) {
      const token = await userCred.generateAuthToken();

      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 3000000),
        secure: true,
        sameSite: "none",
      });
      res.status(200).send(userCred);
      return;
    } else {
      res.status(401).send({ data: "Invalid Credentials" });
      return;
    }
  } catch (error) {
    res.status(500).send("Error occured while authenticating.");
    return;
  }
});

router.post("/logout", auth, async (req, res) => {
  try {
    // console.log("dkfsa");
    const token = req.cookies.jwt;
    if (token) {
      req.user.tokens = [];
      res.clearCookie("jwt", {
        sameSite: "none",
        secure: true,
        path: "/",
      });
      await req.user.save();
      res.status(200).send({ data: "logout successfull" });
      return;
    } else {
      res.status(401).send({ data: "User not logged In." });
    }
  } catch (error) {
    res.status(401).send({ data: "Error occured while logging out!" });
    return;
  }
});

module.exports = router;
