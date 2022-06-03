const Patient = require('../models/patient');
const Report = require('../models/report');
const { STATUS } = require('../constants');
const doctor = require('../models/doctor');
console.log(STATUS);
module.exports.register = async (req, res) => {
  try {
    let phoneNum = req.body.phoneNum;

    let patient = await Patient.findOne({ phoneNum });
    if (patient) {
      return res.status(401).json({
        message: 'Patient already existed with this phone number',
      });
    }
    if (!req.body.patient_name || !req.body.city) {
      return res.status(401).json({
        message: 'Please provide all the Patient details',
      });
    }

    if (!patient && req.body.patient_name) {
      console.log(req.body);
      let patient_created = await Patient.create(req.body);

      return res.status(200).json({
        message: 'Patient registered successfully',
        patientInfo: patient_created.toObject(),
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports.createReport = async (req, res) => {
  try {
    let patient = await Patient.findById({ _id: req.params.id });

    if (!patient) {
      return res.status(403).json({
        message: 'Patient not exists,Please register',
      });
    }

    let { report_name, createdBy, date, referedBy, status } = req.body;
    if (!report_name || !createdBy || !status) {
      return res.status(403).json({
        message: 'Please fill the necessary details of report',
      });
    }

    if (!STATUS.includes(status.toLowerCase())) {
      return res.status(401).json({
        message: 'Status value is not valid',
      });
    }
    if (date == undefined || date == null || !date) {
      // current timestamp in milliseconds
      let ts = Date.now();

      let date_ob = new Date(ts);
      let tdate = date_ob.getDate();
      let month = date_ob.getMonth() + 1;
      let year = date_ob.getFullYear();

      // prints date & time in YYYY-MM-DD format
      //   console.log(year + '-' + month + '-' + tdate);
      date = year + '-' + month + '-' + tdate;
    }
    //console.log(date);
    let report_created = await Report.create({
      reportname: report_name,
      patient: req.params.id,
      createdBy: createdBy,
      date: date,
      referedBy: referedBy,
      status: status.toLowerCase(),
    });
    // console.log(report_created._id);
    patient.reports.push(report_created._id);
    patient.save();
    return res.status(200).json({
      message: 'Report created successfully',
      reportID: report_created._doc._id,
      reportname: report_created.reportname,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports.allReport = async (req, res) => {
  try {
    let patient = await Patient.findById({ _id: req.params.id }).populate({
      path: 'reports',
      model: 'report',
      populate: {
        path: 'createdBy',
        model: 'doctor',
        options: { sort: '-createdAt' },
      },
    });

    console.log(patient);
    let finalReports = [];
    //removing some information from report object
    for (report of patient.reports) {
      let newreport = {
        _id: report.id,
        reportname: report.reportname,
        patient: patient.patient_name,
        createdBy: report.createdBy.name,
        date: report.date,
        referedBy: report.referedBy,
        status: report.status,
        createdAt: report.createdAt,
      };
      finalReports.push(newreport);
    }
    console.log(finalReports);
    if (patient) {
      return res.status(200).json({
        message: 'List of Reports',
        reports: finalReports,
      });
    } else {
      return res.status(401).json({
        message: 'Patient not exists',
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
