const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = 4000;

server.listen(port, function () {
  console.log(`App listening at http://localhost:${port}`);
});

app.use(express.static('integration_build'));
