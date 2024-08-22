const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
    maxlength: [20, "Name cannot be more than 20 characters"],
  },
  completed: {
    type: Boolean, // Specify the type as boolean
    default: false, // Set the default value to false
  },
});

module.exports = mongoose.model("Task", taskSchema);
