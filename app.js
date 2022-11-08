const express = require("express");
const app = express();

const errorMiddleware = require("./middleware/error")


app.use(express.json())

// Route Imports


//Middleware for Errors
app.use(errorMiddleware)

module.exports = app