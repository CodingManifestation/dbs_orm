const { query } = require('../database');
const { SQL_ERROR_CODE, UNIQUE_VIOLATION_ERROR, RAISE_EXCEPTION } = require('../errors');

module.exports.retrieveAll = function retrieveAll() {
    const sql = `SELECT adm_no, stud_name, gender, crse_code FROM student`;
    return query(sql).then(function (result) {
        return result.rows;
    });
};

module.exports.enrolNewStudent = function enrolNewStudent(adminNumber, studentName, gender, address, dob, nationality, courseCode) {
    const sql = 'CALL enrol_new_student($1, $2, $3, $4, $5, $6, $7)';
    return query(sql, [adminNumber, studentName, gender, address, dob, nationality, courseCode])
        .then(function (result) {
            console.log('Student enrolled');
        })
        .catch(function (error) {
            if (error.code === SQL_ERROR_CODE.UNIQUE_VIOLATION) {
                throw new UNIQUE_VIOLATION_ERROR(`Student with adm no ${adminNumber} already exists! Cannot create duplicate.`);
            } 
            if (error.code === SQL_ERROR_CODE.RAISE_EXCEPTION) {
                throw new RAISE_EXCEPTION(error.message);
            }
            throw error;
        });
};
