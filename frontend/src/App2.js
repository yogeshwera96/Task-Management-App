import "./App2.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App2() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/tasks", {
        title,
        description,
        status,
      });
      setTasks([...tasks, response.data.data]);
      setTitle("");
      setDescription("");
      setStatus("pending");
    } catch (error) {
      console.log("Error creating task: ", error.response?.data || error.message);
    }
  }

  async function handleMarkComplete(id) {
    try {
      await axios.put(`http://localhost:3001/tasks/${id}`, { status: "completed" });
      setTasks(tasks.map(task => task._id === id ? { ...task, status: "completed" } : task));
    } catch (error) {
      console.log("Error updating task: ", error);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:3001/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.log("Error deleting task: ", error);
    }
  }

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3001/tasks");
        setTasks(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch tasks");
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <form onSubmit={handleFormSubmit}>
        <div className="form-left">
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
        </div>
      </form>

      <div className="task-list">
        <h1>Task List</h1>
        {tasks.map((task) => (
          <div key={task._id} className="task-card">
            <div className="task-left">
              <p className="task-title">{task.title}</p>
              <p className="task-description">{task.description}</p>
              <span className={`task-status ${task.status}`}>{task.status}</span>
            </div>
            <div className="task-right">
              {task.status === "pending" && (
                <button className="complete-btn" onClick={() => handleMarkComplete(task._id)}>✅ Mark Complete</button>
              )}
              <button className="delete-btn" onClick={() => handleDelete(task._id)}>🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App2;
