const jwt = require('jsonwebtoken');

// Define your secret key here
const secretKey = process.env.AUTHSECRETKEY;

module.exports = {
    Login: (req, res) => {
        var authenticationName = process.env.AUTHENTICATIONNAME;
        var authenticationPassword = process.env.AUTHENTICATIONPASSWORD;
        if (req.body.username == authenticationName && req.body.password == authenticationPassword) {
            const payload = { username: 'juu' };
            const token = jwt.sign(payload, secretKey);
            return res.status(200).json({ success: true, token });
        } else {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    }
};

