// Import the necessary modules
const express = require('express');
const reportsController = require('../controllers/reportsController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

// Create a new router instance
const router = express.Router();

// All routes in this file will use the jwtMiddleware to verify the token and check if the user is an admin.
// Here the jwtMiddleware is applied at the router level to apply to all routes in this file
// But you can also apply the jwtMiddleware to individual routes
router.use(jwtMiddleware.verifyToken, jwtMiddleware.verifyIsAdmin);

router.get('/modulesPerformance', reportsController.generateModulesPerformance);

router.get('/calculateStudentsGPA', reportsController.calculateStudentsGPA);

router.get('/modulesAttendance', reportsController.generateModulesAttendance);

// Export the router
module.exports = router;
