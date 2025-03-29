const express = require("express");
const router = express.Router();
const auth = require("../middleware/Auth");
const bcrypt = require("bcryptjs");
const userRegister = require("../models/userSchema");

//NEW USER STUDENTS
router.post("/adduser", async (req, res) => {
  try {
    const inputPassword = req.body.password;
    const inputConfirmPassword = req.body.confirmpassword;
    const inputUsername = req.body.username;

    if (inputPassword === inputConfirmPassword) {
      const newUser = new userRegister({
        name: req.body.name,
        userId: Date.now(),
        username: req.body.username,
        phone: req.body.phone,
        email: req.body.email,
        pincode: req.body.pincode,
        address: req.body.address,
        role: "user",
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
      });

      const isRegisterd = await userRegister.findOne({
        phone: req.body.phone,
      });
      if (isRegisterd) {
        res.status(409).send({ data: "user already exist with this phone" });
        return;
      }

      const registered = await newUser.save();
      const result = await userRegister.find().sort({ $natural: -1 });
      console.log("user registered successful" + registered);
      res.status(200).send(result);
      return;
    } else {
      res.status(400).send({ data: "Password does not match" });
      return;
    }
  } catch (error) {
    res.status(500).send({ data: "Erro occured while adding User" + error });
    console.log(error);
    return;
  }
});

module.exports = router;
