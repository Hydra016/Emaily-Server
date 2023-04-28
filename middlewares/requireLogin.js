module.exports = (req, res, next) => {
    if(!req.body) {
        return res.status(401).send('you must be logged in');
    }
    next();
}