const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async (req, res, next) => {
    const token = req.header('Auth-token');

    if(!token) return res.status(401).json('Not authorized');

    try {
        const decoded = jwt.verify(token, config.get('jwt_secret'));
        req.user = decoded.user;
        return next();
    } catch (err) {
        return res.status(400).json(err.message);
    }
}