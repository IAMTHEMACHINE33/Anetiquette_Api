const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser");

app.use(express.json()); 
app.use(cors());

app.use(cookieParser());
require("./config/database");
app.use(bodyParser.urlencoded({ extended: true}))

// Route Imports
const productRouter = require("./routes/productRouter");
app.use(productRouter);

const categoryRouter = require("./routes/categoryRouter");
app.use(categoryRouter);

const user = require("./routes/userRoute")
app.use("/api/v1", user)

//Middleware for Errors
const errorMiddleware = require("./middleware/error");
app.use(errorMiddleware);


module.exports = app

// npm i bcryptjs jsonwebtoken validator nodemailer cookie-parser body-parser