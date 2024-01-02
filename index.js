const express = require('express');
const { Connection } = require('./config/db');
const {todoRouter} = require("./routes/todo.route");
const {userRouter} = require("./routes/user.route")

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3500

app.use(express.json())

// Routing for user-related endpoints
app.use("/user",userRouter)
// Routing for todo-related endpoints
app.use("/todo",todoRouter)

// Starting the server and establishing a connection to the database
app.listen(PORT,async()=>{
    try {
        await Connection
        console.log("Connected to DB")
    } catch (error) {
        console.log("failed to Connect to DB")
    }
    console.log(`Server is running on ${PORT}`);
})