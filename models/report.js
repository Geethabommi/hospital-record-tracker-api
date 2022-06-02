const mongoose = require('mongoose');
const { STATUS } = require('../constants');

// const patient = require('./patient');
// const doctor = require('./doctor');
const reportSchema = new mongoose.Schema({
  reportname: {
    type: String,
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patient',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'doctor',
  },
  date: {
    type: String,
  },
  referedBy: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    // enum: [
    //   'Negative',
    //   'Travelled - Quarantine',
    //   'Symptoms - Quarantine',
    //   ' Positive - Admit',
    // ],
    enum: STATUS,
  },
});

const report = mongoose.model('report', reportSchema);
module.exports = report;
