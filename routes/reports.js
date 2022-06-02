const express = require('express');
const router = express.Router();
const passport = require('passport');
var report_controller = require('../controllers/report_controller');

router.get(
  '/:status',
  passport.authenticate('jwt', { session: false }),
  report_controller.getAllReportWithStatus
);

module.exports = router;
