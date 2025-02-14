const axios = require("axios")
const Task = require("../models/taskModel")

exports.getTasks = async (req, res) => {

 try {
  const { status } = req.query;
  let filter = {};

  if(status) {
    if(!['pending', 'completed'].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value"});
    }
    filter.status = status;
  }

  const tasks = await Task.find(filter);

  res.status(200).json({success: true, data: tasks})
 } catch (error) {
  res.status(500).json({ success: false, message: error.message})
 }
}

exports.addTask = async (req, res) => {
  const { title, description, status } = req.body;

  try {
    if(status) {
      if(!['pending', 'completed'].includes(status)) {
        return res.status(400).json({ success: false, message: "Invalid status value"});
      }
    }
    const task = await Task.create({ title, description, status })
    res.status(201).json(task)
  } catch (err) {
    res.status(400).json({ err: err.message })
  }
}


exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Task ID is required" })
    }

    const task = await Task.findByIdAndDelete(id)

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" })
    }

    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.editTask = async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Task ID is required" })
    }

    const task = await Task.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" })
    }

    res
      .status(200)
      .json({ success: true, message: "Task updated successfully", data: task })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}
