const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }]
});


module.exports = mongoose.model("Task", taskSchema);