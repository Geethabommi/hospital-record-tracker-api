var mongoose = require('mongoose');
var env = require('./environment');
// mongoose.connect('mongodb://localhost/hospital-recoredtracker-api');
mongoose.connect(`${env.mongodb_uri}${env.db}`);

const db = mongoose.connection;

db.on('error', console.error.bind('Error connecting to DB'));

db.once('open', () => {
  console.log('Connected to MongoDB - hospital-recoredtracker-api');
});

module.exports = db;
