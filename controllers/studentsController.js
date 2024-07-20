const { UNIQUE_VIOLATION_ERROR, RAISE_EXCEPTION } = require('../errors');
const studentModel = require('../models/students');

module.exports.retrieveAll = function (req, res) {
    // Get all students
    return studentModel
        .retrieveAll()
        .then(function (allStudents) {
            return res.json({ students: allStudents });
        })
        .catch(function (error) {
            console.error(error);
            return res.status(500).json({ error: "Unknown Error" });
        });
}

module.exports.enrolNewStudent = function (req, res) {
    const adminNumber = req.body.adminNumber;
    const studentName = req.body.studentName;
    const gender = req.body.gender;
    const address = req.body.address;
    const dob = req.body.dob;
    const nationality = req.body.nationality;
    const courseCode = req.body.courseCode;
    
    return studentModel.enrolNewStudent(adminNumber, studentName, gender, address, dob, nationality, courseCode)
        .then(function(result) {
            return res.sendStatus(200);
        })
        .catch(function(error){
            console.log(error)
            if (error instanceof UNIQUE_VIOLATION_ERROR || error instanceof RAISE_EXCEPTION) {
                return res.status(400).json({ error: error.message });
            } 
            console.error(error);
            return res.status(500).send('unknown error');
        });
}