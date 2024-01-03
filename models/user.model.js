const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Defining the user schema using mongoose.Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };