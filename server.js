import express from "express";
let app = express();

let hostname = "localhost";
let port = 8000;

app.get("/helloworld", (req, res) => {
  res.send("Hello world!!!!!");
});

app.listen(port, hostname, () => {
  console.log(`Server is started at ${hostname}:${port}/`);
});

