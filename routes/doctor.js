const express = require('express');
const router = express.Router();

var doctor_controller = require('../controllers/doctor_controller');

router.post('/login', doctor_controller.login);
router.post('/register', doctor_controller.register);

module.exports = router;
