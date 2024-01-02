const mongoose = require("mongoose")
require("dotenv").config()

// Establishing a connection to the MongoDB database
const Connection = mongoose.connect(process.env.MONGO_URL)

module.exports={Connection}