const db = require("../models/index.db");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      throw new Error("Email and password are required!");
    }
    let user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      return res.status(400).send({
        message: "Failed! Username is already in use!",
      });
    }
    next();
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i],
        });
        return;
      }
    }
  }

  next();
};

module.exports = { checkDuplicateUsernameOrEmail, checkRolesExisted };
