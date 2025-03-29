require("dotenv").config();
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const issueSchema = new mongoose.Schema(
  {
    issueId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    imageURL: {
      type: String,
    },
    pincode: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    finsishedAt: {
      type: String,
    },
    isUserFinished: {
      type: Boolean,
      default: false,
      required: true,
    },
    isMcVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    finsishedAt: {
      type: String,
    },
    username: {
      require: true,
      type: String,
    },
  },
  { timestamps: true }
);

const issueRegister = new mongoose.model("issue", issueSchema);
module.exports = issueRegister;
