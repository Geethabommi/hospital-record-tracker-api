const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    patient_name: {
      type: String,
      required: true,
    },
    phoneNum: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    reports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'report',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const patient = mongoose.model('patient', patientSchema);

module.exports = patient;
