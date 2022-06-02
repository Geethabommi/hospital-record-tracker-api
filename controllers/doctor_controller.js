const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const Doctor = require('../models/doctor');

module.exports.register = async (request, response) => {
  try {
    if (request.body.password != request.body.confirm_password) {
      return response.status(401).json({
        message: 'Password not matched',
      });
    }
    let phoneNum = request.body.phoneNum;
    let doctor = await Doctor.findOne({ phoneNum });
    if (doctor) {
      return response.status(403).json({
        message: 'Doctor already exists with this phone number',
      });
    } else {
      let doctor_created = await Doctor.create({
        phoneNum: phoneNum,
        name: request.body.name,
        password: request.body.password,
      });
      return response.status(200).json({
        message: 'Doctor registered Successfully',
      });
    }
  } catch (err) {
    return response.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports.login = async (request, respone) => {
  let phoneNum = request.body.phoneNum;
  let doctor = await Doctor.findOne({ phoneNum });
  if (!doctor) {
    return respone.status(403).json({
      message: 'Please register,user not existed with this phone number',
    });
  }
  if (doctor) {
    var docObj = { ...doctor };
    let { name, password } = request.body;
    if (
      name != doctor.name ||
      password != doctor.password ||
      phoneNum != doctor.phoneNum
    ) {
      return respone.status(401).json({
        message: 'Invalid username and password / phone number',
      });
    } else {
      let token = jsonwebtoken.sign(docObj, 'hospitalrecordtracker', {
        expiresIn: '10h',
      });
      return respone.status(200).json({
        message: 'Login Successful',
        token,
        doctorID: docObj._doc._id.toString(),
      });
    }
  }
};
