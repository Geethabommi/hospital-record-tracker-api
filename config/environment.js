const development = {
  name: 'development',
  db: 'hospital-recoredtracker-api',
  mongodb_uri: 'mongodb://localhost/',
  secretKey: 'hospitalrecordtracker',
};
const production = {
  name: 'production',
  db: process.env.AUTH_APP_DB,
  mongodb_uri: process.env.MONGODB_URI,
  secretKey: process.env.SECRET_KEY,
};

module.exports =
  eval(process.env.AUTH_APP_ENVIRONMENT) == undefined
    ? development
    : eval(process.env.AUTH_APP_ENVIRONMENT);
