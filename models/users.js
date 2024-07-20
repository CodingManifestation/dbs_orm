const { query } = require('../database');

module.exports.retrieveByUserAccount = function retrieveByUserAccount(accountNo) {
    const sql = 'SELECT * FROM user_account WHERE account_no = $1';
    return query(sql, [accountNo]).then(function (result) {
        const rows = result.rows;
        return rows[0];
    });
};

