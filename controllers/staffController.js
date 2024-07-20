const {RAISE_EXCEPTION, EMPTY_RESULT_ERROR } = require('../errors');
const staffModel = require('../models/staff');

module.exports.transferStaff = function(req, res) {
    const staffNumber = req.body.staffNumber;
    const departmentCode = req.body.departmentCode;
    
    return staffModel.transferStaff(staffNumber, departmentCode)
        .then(function(result) {
            return res.sendStatus(200);
        })
        .catch(function(error){
            console.error(error)
            if (error instanceof EMPTY_RESULT_ERROR) {
                return res.status(404).json({ error: error.message });
            }            
            if (error instanceof RAISE_EXCEPTION) {
                return res.status(400).json({ error: error.message });
            } 
            return res.status(500).json({error: error.message});
        });
}