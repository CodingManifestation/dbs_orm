// See https://expressjs.com/en/guide/routing.html for routing

const express = require('express');
const modulesController = require('../controllers/modulesController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

const router = express.Router();

// All routes in this file will use the jwtMiddleware to verify the token and check if the user is an admin.
// Here the jwtMiddleware is applied at the router level to apply to all routes in this file
// But you can also apply the jwtMiddleware to individual routes
router.use(jwtMiddleware.verifyToken, jwtMiddleware.verifyIsAdmin);

router.post('/', modulesController.create);

router.get('/:code', modulesController.retrieveByCode);

router.delete('/:code', modulesController.deleteByCode);

router.put('/:code', modulesController.updateByCode);

router.get('/', modulesController.retrieveAll);

router.post('/table', modulesController.initTable);

module.exports = router;
