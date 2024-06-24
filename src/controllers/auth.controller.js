const signin = async (req, res) => {
  try {
    res.send("singin");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const signup = async (req, res) => {
  try {
    res.send("singup");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signin, signup };
