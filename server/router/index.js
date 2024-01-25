const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.put('/users/:userId/periodLength', userController.updateUserPeriodLength);
router.put('/users/:userId/cycleLength', userController.updateUserCycleLength);
router.put('/users/:userId/periodDates', userController.updateUserPeriodDates);
router.post('/users/:userId/updateUserPeriodDates', userController.setNewPeriodDates);

module.exports = router