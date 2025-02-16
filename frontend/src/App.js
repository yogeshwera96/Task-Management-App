import "./App.css"
import { useState, useEffect } from "react"
import axios from "axios"
import Task from "./components/Task"
import "./App.css"

function App() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("pending")
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState(null)
  //Todo - add notification when task is added successfully
  async function handleFormSubmit(e) {
    e.preventDefault()

    if (!title.trim() || !description.trim()) {
      alert("Title and Description are required!")
      return
    }

    try {
      const response = await axios.post(
        `https://task-management-app-backend-hs0r.onrender.com/tasks`,
        {
          title,
          description,
          status,
        }
      )
      console.log("Task Created: ", response.data)
      setTasks([...tasks, response.data])
      setNotification({ message: "Task added successfully!", type: "create" })
      setTimeout(() => setNotification(""), 3000)
      setTitle("")
      setDescription("")
      setStatus("pending")
    } catch (error) {
      console.log(
        "Error creating task: ",
        error.response?.data || error.message
      )
    }
  }

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `https://task-management-app-backend-hs0r.onrender.com/tasks`
        )
        console.log(response.data.data)
        setTasks(response.data.data)
        setLoading(false)
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch tasks")
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  if (loading) return <p>Loading tasks...</p>
  if (error) return <p>Error: {error} </p>

  return (
    <div className="">
      <h1>WELCOME TO THE TASK MANAGEMENT SYSTEM</h1>
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <input
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value={"pending"}>Pending</option>
          <option value={"completed"}>Completed</option>
        </select>
        <button type="submit" disabled={!title.trim() || !description.trim()}>
          Submit
        </button>
      </form>
      {notification && (
        <div className={`notification-popup ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <h1>Task List</h1>
      <div className="list">
        {tasks.map((task) => (
          <Task
            key={task._id}
            title={task.title}
            description={task.description}
            status={task.status}
            _id={task._id}
            tasks={tasks}
            setTasks={setTasks}
            notification={notification}
            setNotification={setNotification}
          />
        ))}
      </div>
    </div>
  )
}

export default App
