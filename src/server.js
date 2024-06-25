require("dotenv").config();
const express = require("express");
const server = express();
const morgan = require("morgan");
const cors = require("cors");
const cookieSession = require("cookie-session");
const { COOKIE_SECRET } = process.env;

const mainRouter = require("./routes/mainRouter");

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());
server.use(
  cookieSession({
    name: "cookie-session",
    keys: [COOKIE_SECRET],
    httpOnly: true,
    sameSite: "strict",
  })
);

server.use("/api", mainRouter);

module.exports = server;
