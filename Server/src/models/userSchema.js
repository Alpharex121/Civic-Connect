require("dotenv").config();
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmpassword: {
      type: String,
      required: true,
    },
    issues: [
      {
        issueId: {
          type: String,
        },
      },
    ],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = await jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY
    );
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (error) {
    console.log("Error occured while generating token");
    console.log(error);
  }
};
userSchema.methods.addIssues = async function (issueId) {
  try {
    this.issues = this.issues.concat({ issueId });
    await this.save();
    return issueId;
  } catch (error) {
    console.log("Error occured while adding issue");
    console.log(error);
  }
};

//PASSWORD HASHING
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmpassword = await bcrypt.hash(this.confirmpassword, 10);
  }

  next();
});

const userRegister = new mongoose.model("user", userSchema);
module.exports = userRegister;
