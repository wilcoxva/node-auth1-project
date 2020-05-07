const bcrypt = require('bcryptjs');

module.exports = (req, res, next) => {
    if(req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ message: "you shall not pass!" });
    }
};