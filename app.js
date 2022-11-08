const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
require("./config/database");

// Route Imports
const productRouter = require("./router/productRouter");
app.use(productRouter);

//Middleware for Errors
const errorMiddleware = require("./middleware/error");
app.use(errorMiddleware);

// app.listen(90)
module.exports = app