const db = require("../models/index.db");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const singin = async (email, password, session) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User Not found.");
  }
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    throw new Error("Invalid Password!");
  }
  const token = jwt.sign({ id: user.id }, config.SECRET, {
    algorithm: "HS256",
    allowInsecureKeySizes: true,
    expiresIn: 86400,
  });

  let authorities = [];
  const roles = await user.getRoles();
  for (let i = 0; i < roles.length; i++) {
    authorities.push("ROLE_" + roles[i].name.toUpperCase());
  }

  session.token = token;

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    roles: authorities,
  };
};

const singup = async (email, password, role) => {
  const user = await User.create({
    email: email,
    password: bcrypt.hashSync(password, 8),
  });

  if (role) {
    const roles = await Role.findAll({
      where: {
        name: {
          [Op.or]: role,
        },
      },
    });

    const result = user.setRoles(roles);
    if (result) return { message: "User registered successfully!" };
  } else {
    const result = user.setRoles([1]);
    if (result) return { message: "User registered successfully!" };
  }
};

module.exports = { singup, singin };
