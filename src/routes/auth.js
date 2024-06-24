const { Router } = require("express");
const authRouter = Router();
const controller = require("../controllers/auth.controller");

authRouter.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

authRouter.post("/signin", controller.signin);
authRouter.post("/signup", controller.signup);

module.exports = authRouter;
