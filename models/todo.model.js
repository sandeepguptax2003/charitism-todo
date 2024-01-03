const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Defining the todo schema using mongoose.Schema
const todoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const TodoModel = mongoose.model("Todo", todoSchema);

module.exports = { TodoModel };