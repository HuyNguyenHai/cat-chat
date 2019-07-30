require('dotenv').config()
import express from "express";
import ConnectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initRoutes from "./routes/api";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import configSession from "./config/session";
import passport from "passport";
var https = require('https');
var pem = require('pem');

// pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
//   if (err) {
//     throw err;
//   }
//   var app = express();
 
//   app.get('/', function (req, res) {
//     res.send('o hai!')
//   });
 
//   https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(port, hostname, () => {
//     console.log(`Server is started at ${hostname}:${port}/`);
//   });
// });

/**
 * @param app is exactly express module
 */

let app = express();

let hostname = process.env.APP_HOST;
let port = process.env.APP_PORT;

ConnectDB();
//Enable post data for request
app.use(bodyParser.urlencoded({extended: true}));

//config session
configSession(app);

//Enable to use flash function for flash message
app.use(connectFlash());

//config view engine
configViewEngine(app);

//config passport
app.use(passport.initialize());
app.use(passport.session());

//init routes
initRoutes(app);

app.listen(port, hostname, () => {
  console.log(`Server is started at ${hostname}:${port}/`);
});