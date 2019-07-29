require("dotenv").config();
import nodeMailer from "nodemailer";

let adminEmail = process.env.MAIL_USER;
let adminPassword = process.env.MAIL_PASSWORD;
let adminHost = process.env.MAIL_HOST;
let adminPort = process.env.MAIL_PORT;

let sendMail = (to, subject, htmlContent) => {
  let transporter = nodeMailer.createTransport({
    service: "gmail",
    host: adminHost,
    port: adminPort,
    secure: false,
    auth: {
      user: adminEmail,
      pass: adminPassword
    }
  });

  let option = {
    from: adminEmail,
    to: to,
    subject: subject,
    html: htmlContent,
  };

  return transporter.sendMail(option);//this default return a Promise
}

module.exports = sendMail;