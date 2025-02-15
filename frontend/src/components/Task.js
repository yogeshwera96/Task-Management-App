import axios from "axios"
import "../App.css"
import { useEffect } from "react"

const Task = ({ title, description, status, _id, tasks, setTasks }) => {
  async function handleDelete() {
    try {
      const response = await axios.delete(`http://localhost:3001/tasks/${_id}`)
      console.log("Task deleted", response.data)
      setTasks(tasks.filter((task) => task._id !== _id))
    } catch (error) {
      console.error(
        "Error deleting task: ",
        error.response?.data || error.message
      )
    }
  }

  async function markAsComplete() {
    try {
      await axios.patch(`http://localhost:3001/tasks/${_id}`, {
        status: "completed",
      })
      setTasks(
        tasks.map((task) =>
          task._id === _id ? { ...task, status: "completed" } : task
        )
      )
    } catch (error) {
      console.error(
        "Error deleting task: ",
        error.response?.data || error.message
      )
    }
  }

  return (
    <div className="task">
      <h2>{title}</h2>
      <p>{description}</p>
      <h3 className={status === "pending" ? "pending" : "completed"}>
        {status}
      </h3>
      {status === "pending" && (
        <button onClick={markAsComplete}>Mark as Complete</button>
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default Task
