// server.js
// where your node app starts

// init project
var path = require('path');
var express = require('express');
var app = express();
var PORT = process.env.PORT || 5000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + "/views"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/timestamp", (req,res) => {
  
  res.json({unix: new Date().getTime(), utc: new Date().toUTCString()});
})

app.get("/api/timestamp/:timestamp",(req,res) => {

  let dateString = req.params.timestamp;  

  let dateObject = /\d{5,}/.test(dateString)? new Date(parseInt(dateString)) : new Date(dateString);

  if(isNaN(dateObject.getTime())) return res.json({error: "Invalid Date"});
  

  res.json({unix: dateObject.getTime(), utc: dateObject.toUTCString()});
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});