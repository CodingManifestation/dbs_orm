const userModel = require('../models/users');

module.exports.login = function (req, res, next) {
    const accountNo = req.body.accountNo;
    const password = req.body.password;

    if (!accountNo || !password) {
        return res.status(400).json({ message: 'Account Number and password are required' });
    }

    userModel.retrieveByUserAccount(accountNo)
        .then(function (user) {
            if (!user) {
                return res.status(401).json({ message: 'Invalid Account Number or password' });
            }
            res.locals.hash = user.password;
            res.locals.accountNo = user.accountNo;
            res.locals.role = user.role;
            next();
        })
        .catch(function (error) {
            return res.status(500).json({ message: error.message });
        });
}