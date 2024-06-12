const jwt = require('jsonwebtoken');

// Define your secret key here
const secretKey = 'Rifahadmt';

module.exports = {
    Login: (req, res) => {
        console.log(req.body);
        var a = 'rifahad';
        var b = '12345';
        if (req.body.username == a && req.body.password == b) {
            const payload = { username: 'juu' };
            const token = jwt.sign(payload, secretKey);
            return res.status(200).json({ success: true, token });
        } else {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    }
};
