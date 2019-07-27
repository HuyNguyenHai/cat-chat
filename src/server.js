require('dotenv').config()
import express from "express";
import ConnectDB from "./config/connectDB";
import ContactModel from "./models/contact.model";

let app = express();

ConnectDB();

let hostname = process.env.APP_HOST;
let port = process.env.APP_PORT;

app.get("/test-database", async (req, res) => {
  try {
    let item = {
      userId: "123134123",
      contactId: "e23423df"
    };

    let contact = await ContactModel.createNew(item);
    res.send(contact);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, hostname, () => {
  console.log(`Server is started at ${hostname}:${port}/`);
});
