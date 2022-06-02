const express = require('express');
const router = express.Router();

var doctor_routes = require('./doctor');
var patient_routes = require('./patient');
var report_routes = require('./reports');

router.use('/doctors', doctor_routes);
router.use('/patients', patient_routes);
router.use('/reports', report_routes);

module.exports = router;
