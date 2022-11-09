const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
require("./config/database");

// Route Imports
const productRouter = require("./routes/productRouter");
app.use(productRouter);

const user = require("./routes/userRoute")
app.use("/api/v1", user)

//Middleware for Errors
const errorMiddleware = require("./middleware/error");
app.use(errorMiddleware);

// app.listen(90)
module.exports = app

// npm i bcryptjs jsonwebtoken validator nodemailer cookie-parser body-parser