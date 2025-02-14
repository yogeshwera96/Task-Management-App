require("dotenv").config()

const express = require("express")
const app = express()
const tasksRoutes = require("./routes/tasksRoutes")
const mongoose = require("mongoose")

//middleware to parse the request body
app.use(express.json())

app.use("/tasks", tasksRoutes)

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
