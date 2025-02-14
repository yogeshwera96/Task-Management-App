const tasks = [
  {
    title: "Task 1",
    description: "Description of Task 1",
    status: "Completed",
  },
  {
    title: "Task 2",
    description: "Description of Task 2",
    status: "Pending",
  },
]

exports.getTasks = (req, res) => {
  res.json(tasks)
}

exports.addTask = () => {}

exports.deleteTask = () => {}

exports.editTask = () => {}
