const Task = ({ title, description, status }) => {
  return (
    <div className="task">
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{status}</p>
    </div>
  )
}

export default Task
