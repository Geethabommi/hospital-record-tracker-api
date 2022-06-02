const express = require('express');
const PORT = process.env.PORT || 8001;
const app = express();
const routes = require('./routes/index');
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');
const mongoose = require('./config/mongoose');
const env = require('./config/environment');

app.use(express.urlencoded());
app.use(passport.initialize());
app.use('/', routes);

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error in running server: ${err}`);
    return;
  }
  console.log(`server is running at port: ${PORT}`);
  return;
});
