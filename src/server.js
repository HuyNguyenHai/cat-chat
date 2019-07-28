require('dotenv').config()
import express from "express";
import ConnectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";

let app = express();

let hostname = process.env.APP_HOST;
let port = process.env.APP_PORT;

ConnectDB();

configViewEngine(app);

app.get('/', (req, res) => {
  res.render("main/master");
});

app.get('/login', (req, res) => {
  res.render("auth/loginRegister");
});

app.listen(port, hostname, () => {
  console.log(`Server is started at ${hostname}:${port}/`);
});
