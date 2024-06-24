const express = require("express");
const server = express();
const morgan = require("morgan");
const cors = require("cors");

const mainRouter = require("./routes/mainRouter");

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use("/api", mainRouter);

module.exports = server;
