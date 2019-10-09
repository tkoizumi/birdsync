const excel = require('./connectors/excel/excel');
const express = require('express');
const port = 8080;
const app = express();



app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


const server = app.listen(port);
const io = require('socket.io').listen(server);

io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('join', function(data) {
        console.log(data);
        excel.sayExcel();

    });
});
