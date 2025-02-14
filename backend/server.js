require("dotenv").config()

const express = require("express")
const app = express()
const tasksRoutes = require("./routes/tasksRoutes")
const mongoose = require("mongoose")

app.use("/tasks", tasksRoutes)

app.get("/", (req, res) => {
  res.send("<h1> Testing server</h1>")
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB is connected successfully")
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("server listening on port", process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  })
