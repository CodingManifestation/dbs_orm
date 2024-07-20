const { query } = require('../database');

module.exports.generateModulesPerformance = function generateModulesPerformance() {
    const sql = 'SELECT * FROM get_modules_performance()';
    return query(sql)
        .then(function (result) {
            const rows = result.rows;
            return rows;
        })
        .catch(function (error) {
            throw error;
        });
};

module.exports.calculateStudentsGPA = function calculateStudentsGPA() {
    const sql = 'CALL calculate_students_gpa()';
    return query(sql)
        .then(function (result) {
            console.log('Calculating students GPA');
        })
        .catch(function (error) {
            throw error;
        });
};

module.exports.generateAttendance = function generateAttendance() {
    // TODO: Fix this sql query to invoke the corresponding database function/procedure 
    const sql = '';
    return query(sql)
        .then(function (result) {
            const rows = result.rows;
            return rows;
        })
        .catch(function (error) {
            throw error;
        });
};
