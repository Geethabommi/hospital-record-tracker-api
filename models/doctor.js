const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    phoneNum: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const doctor = mongoose.model('doctor', doctorSchema);

module.exports = doctor;
