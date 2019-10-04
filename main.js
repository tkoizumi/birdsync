console.log('Hello Hello Starting Server');
//hello


// content of index.js
const http = require('http')
const fs = require("fs");
const port = 8080;

var html = fs.readFileSync('index.html');

const requestHandler = (request, response) => {
  console.log(request.url)
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(html);
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})