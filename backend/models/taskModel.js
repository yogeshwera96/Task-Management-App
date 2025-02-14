const mongoose = require("mongoose")

const Schema = mongoose.Schema

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'completed'], default: 'pending'
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Task", taskSchema)
