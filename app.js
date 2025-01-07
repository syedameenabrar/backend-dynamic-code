// Package Imports
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { catchError } = require("./utils/catchError")
const responser = require("./utils/responser");
const globalError = require("./utils/globalError")
const routes = require("./routes/index")

const app = express();
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }))
app.use(cors());

app.use(express.static(__dirname + "/images"));
app.use("/images", express.static("images"));

// routes
routes(app)

// health
app.get("/health", catchError(async (req, res) => {
    const healthPayload = {
        projectName: 'Dynamic Backend Project',
        frontEnd: 'Angular',
        backEnd: 'NodeJs',
        dataBase: 'MongoDB',
        container: 'Docker Container'
    }
    return responser.send(200, `${healthPayload.projectName} Health Check Up`, req, res, healthPayload)
}))

// global error
app.use(globalError.errorHandler)

module.exports = app
