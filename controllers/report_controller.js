const Report = require('../models/report');
const { STATUS } = require('../constants');

module.exports.getAllReportWithStatus = async (req, res) => {
  try {
    let status = req.params.status.toLowerCase();
    if (!status || !STATUS.includes(status)) {
      return res.status(401).json({
        message: 'Invalid Status',
      });
    }
    let reports = await Report.find({ status: status })
      .populate('createdBy')
      .populate('patient');
    let finalReports = [];
    for (report of reports) {
      let newreport = {
        _id: report._id,
        reportname: report.reportname,
        patient: report.patient.patient_name,
        createdBy: report.createdBy.name,
        date: report.date,
        referedBy: report.referedBy,
        status: report.status,
      };
      finalReports.push(newreport);
    }
    return res.status(200).json({
      message: 'List of Reports',
      reports: finalReports,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
