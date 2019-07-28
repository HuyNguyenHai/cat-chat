require('dotenv').config()
import express from "express";
import ConnectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initRoutes from "./routes/api";
import bodyParser from "body-parser";

/**
 * @param app is exactly express module
 */

let app = express();

let hostname = process.env.APP_HOST;
let port = process.env.APP_PORT;

ConnectDB();
//Enable post data for request
app.use(bodyParser.urlencoded({extended: true}));

configViewEngine(app);

initRoutes(app);

app.listen(port, hostname, () => {
  console.log(`Server is started at ${hostname}:${port}/`);
});
