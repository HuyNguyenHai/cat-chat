var express = require('express');
var app = express();

var hostname = "localhost";
var port = 8000;

app.get("/helloworld", (req, res) => {
    res.send("Hello world!!!!!");
});

app.listen(port, hostname, () => {
    console.log(`Server is started at ${hostname}:${port}/`);
});

