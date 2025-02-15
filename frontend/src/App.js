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

  //Todo - add notification when task is added successfully
  async function handleFormSubmit(e) {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:3001/tasks", {
        title,
        description,
        status,
      })
      console.log("Task Created: ", response.data)
      setTasks([...tasks, response.data])
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
        const response = await axios.get("http://localhost:3001/tasks")
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
        <button type="submit">Submit</button>
      </form>

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
          />
        ))}
      </div>
    </div>
  )
}

export default App
