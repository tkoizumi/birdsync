
const express = require('express');
const port = 8080;

const app = express();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static('public'));

app.listen(port, function () {
  console.log("Server is running on "+ port +" port");
});
