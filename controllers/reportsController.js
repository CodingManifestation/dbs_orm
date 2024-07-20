const reportsModel = require('../models/reports');

module.exports.generateModulesPerformance = function(req, res) {
    const code = req.query.code;

    // Generate attendance using query parameters
    return reportsModel.generateModulesPerformance( code )
        .then(function(modulePerformance) {
            return res.json({ performance: modulePerformance })
        } )
        .catch(function(error){
            console.error(error);
            res.status(500).send({ error: error.message });
        });
}

module.exports.calculateStudentsGPA = function(req, res){

    return reportsModel.calculateStudentsGPA()
        .then(function(result){
            return res.json({ message: "Calculating students GPA" })
        } )
        .catch(function(error){
            console.error(error);
            res.status(500).send({error: error.message});
        });
}

module.exports.generateModulesAttendance = function(req, res){

    return reportsModel.generateAttendance()
        .then(function(moduleAttendance){
            return res.json({ attendance: moduleAttendance })
        })
        .catch(function(error){
            console.error(error);
            res.status(500).send({error: error.message});
        });
}