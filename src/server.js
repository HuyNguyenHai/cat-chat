require('dotenv').config()
import express from "express";
import ConnectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initRoutes from "./routes/api";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import configSession from "./config/session";

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

configViewEngine(app);

initRoutes(app);

app.listen(port, hostname, () => {
  console.log(`Server is started at ${hostname}:${port}/`);
});