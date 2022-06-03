## Hospital record tracker app

This contains the list of API's for managing hospital such as creating doctors account, adding patients,mangang their reports and fetching the reports by status.

# Tools,stacks and library used:

1. Nodejs and Expressjs is used to develop this authentication web app
2. passport library is used for JWT web token authentication
3. mongodb and mongoose for data storage

# Deployment:

The hospital record tracker api is deployed at https://hospital-record-tracker-app.herokuapp.com

# Functionalities

1. Doctor Registration
2. Doctor Login
3. Patient Registration
4. Report Creation
5. Getting report of particular patient with patient ID
6. Getting report with the status

# Routes

1. /doctors/register -> with user phone number, name, password and confirm password
2. /doctors/login -> return JWT to be used for authentication
3. /patients/register -> with patient phone number and name and this requires docter's login
4. /patients/:id/create_report -> Creating report for patient and this requires doctor's login
5. /patients/:id/all_reports -> Getting all reports with patient ID and this requires doctor's login
6. /reports/:status -> Getting all the report with particular status and this requires doctor's login

# Instructions

To run the code in local

1. Clone the repo: https://github.com/Geethabommi/hospital-record-tracker-api.git
2. Install packages: npm install
3. Launch: Run `npm start` to run server
4. Visit in your browser at: `http://localhost:8001`
