const jwt = require("jsonwebtoken");
require("dotenv").config(); // To load environment variables

// Define your secret key here
const secretKey = process.env.AUTHSECRETKEY;

module.exports = {
  Login: (req, res) => {
    const authenticationName = process.env.AUTHENTICATIONNAME;
    const authenticationPassword = process.env.AUTHENTICATIONPASSWORD;

    // Checking if the username and password match environment variables
    if (req.body.username === authenticationName && req.body.password === authenticationPassword) {
      const payload = { username: "juu" };
      const token = jwt.sign(payload, secretKey); // Generate a JWT token
      return res.status(200).json({ success: true, token });
    } else {
      return res.status(401).json({ success: false, message: "Invalid username or password" });
    }
  },
};
