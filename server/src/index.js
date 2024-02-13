const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require("cors");
const httpStatus = require("http-status");

const routes = require("./routes/index");
const ApiError = require("./utils/ApiError");

require('dotenv').config()

app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());


const PORT = process.env.PORT;
const URL = process.env.MONGO_URL;

app.get('/', (req, res) => {
    return res.send("The backend is working.").status(200)
});


app.use("/v1", routes);

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

mongoose.connect(URL).then(() => {
    console.log("Connected to DB.")
}).catch(error => {
    console.log(error);
})
app.listen(PORT, () => {
    console.log("The backend is running at " + PORT);
});
