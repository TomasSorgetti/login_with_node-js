const authService = require("../services/auth.service");

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const payload = await authService.singin(email, password,req.session);
    res.status(200).json(payload);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const signup = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const payload = await authService.singup(email, password, role);
    res.status(200).json(payload);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!",
    });
  } catch (error) {
    this.next(err);
  }
};
module.exports = { signin, signup };
