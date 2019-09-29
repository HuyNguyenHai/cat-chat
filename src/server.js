  require("dotenv").config();
import express from "express";
import ConnectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initRoutes from "./routes/api";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import session from "./config/session";
import passport from "passport";
import http from "http";
import socketio from "socket.io";
import initSockets from "./sockets";
import cookieParser from "cookie-parser";
import configSocketIo from "./config/socketio";

/**
 * @param app is exactly express module
 */

let app = express();

//Init server with socket.io and express app

let server = http.createServer(app);
let io = socketio(server);

let hostname = process.env.APP_HOST;
let port = process.env.APP_PORT;

ConnectDB();
//Enable post data for request
app.use(bodyParser.urlencoded({ extended: true }));

//config session
session.config(app);

//Enable to use flash function for flash message
app.use(connectFlash());

//Use cookie-parser
app.use(cookieParser());

//config view engine
configViewEngine(app);

//config passport
app.use(passport.initialize());
app.use(passport.session());

//init routes
initRoutes(app);

//add passport socketio
configSocketIo(io, cookieParser, session.sessionStore);

//Init all socket.io
initSockets(io);

server.listen(port, hostname, () => {
  console.log(`Server is started at ${hostname}:${port}/`);
});

// var https = require("https");
// var pem = require("pem");

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