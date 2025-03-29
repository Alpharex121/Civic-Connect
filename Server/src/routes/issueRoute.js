const express = require("express");
const router = express.Router();
const auth = require("../middleware/Auth");
const bcrypt = require("bcryptjs");
const issueRegister = require("../models/issueSchema");
const userRouter = require("../models/userSchema");
const img = require("../constants/constants");

//NEW USER STUDENTS

router.get("/issues", auth, async (req, res) => {
  try {
    if (req.role === "corporation") {
      const data = await issueRegister.find();
      res.status(200).send(data);
      return;
    } else {
      res.status(401).send({ data: "User not authenticated." });
    }
  } catch (error) {
    res.status(500).send({ data: "Error occured while fetching issues" });
  }
});

router.post("/addissue", auth, async (req, res) => {
  try {
    if (req.user.role !== "user") {
      res.status(401).send({ data: "Not allowed to post issues." });
      return;
    }
    const issueId = Date.now();
    const newIssue = new issueRegister({
      issueId: issueId,
      title: req.body.title,
      description: req.body.description,
      imageURL: img,
      pincode: req.body.pincode,
      location: req.body.location,
      category: req.body.category,
      status: "pending",
      username: req.user.username,
    });

    const issue = await newIssue.save();
    console.log("issue Added successful" + issue);
    const userCred = await userRouter.findOne({ username: req.user.username });
    console.log(userCred);
    await userCred.addIssues(issueId);
    res.status(200).send(issue);
    return;
  } catch (error) {
    res.status(500).send({ data: "Erro occured while adding User" + error });
    console.log(error);
    return;
  }
});

module.exports = router;
