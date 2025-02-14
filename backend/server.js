const express = require("express")
const app = express()
const tasksRoutes = require("./routes/tasksRoutes")

app.use("/tasks", tasksRoutes)

app.get("/", (req, res) => {
  res.send("<h1> Testing server</h1>")
})

app.listen(3001, () => console.log("app listening on port 3001"))
