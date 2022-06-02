const express = require('express');
const router = express.Router();
var patient_controller = require('../controllers/patient_controller');
const passport = require('passport');

router.post(
  '/register',
  passport.authenticate('jwt', { session: false }),
  patient_controller.register
);

router.post(
  '/:id/create_report',
  passport.authenticate('jwt', { session: false }),
  patient_controller.createReport
);
router.get(
  '/:id/all_reports',
  passport.authenticate('jwt', { session: false }),
  patient_controller.allReport
);

module.exports = router;
