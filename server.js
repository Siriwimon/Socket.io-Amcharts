var app = require('http').createServer(handler),
  io = require('socket.io').listen(app),
  fs = require('fs'),
  sys = require('util'),
  exec = require('child_process').exec,
  child;
// Listen on port 8000
app.listen(8000);
// If all goes well when you open the browser, load the index.html file
function handler(req, res) {
    fs.readFile(__dirname+'/index.html', function(err, data) {
        if (err) {
      // If no error, send an error message 500
            console.log(err);
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.end(data);
    });
}
 

var state = "0";
var allData = [];
var data;
var state;

io.sockets.on('connection', function(socket) { 
  console.log("connecting....");
  socket.on('btStateStart', function(message){
    var cnt = 0;
    allData.splice(0, allData.length);
    console.log(message);
    for (var i = 0; i <= 200; i++) {
      cnt = i;
      voltage = ((Math.random()*(5-4)) + 4).toFixed(2);
      current = ((Math.random()*(370-360)) + 360).toFixed(2);
      power = ((Math.random()*(315-309)) + 309).toFixed(2);
      time = Math.floor(Math.random()*(6000-5000)) + 5000;

      if (cnt >= 0 && cnt < 20){
        state = 1;
      }else if (cnt >= 20 && cnt < 40){
        state = 2;
      }else if (cnt >= 40 && cnt < 60){
        state = 3;
      }else if (cnt >= 60 && cnt < 80){
        state = 4;
      }else if (cnt >= 80 && cnt < 100){
        state = 5;
      }else if (cnt >= 100 && cnt < 120){
        state = 6;
      }else if (cnt >= 120 && cnt < 140){
        state = 7;
      }else if (cnt >= 140 && cnt < 160){
        state = 8;
      }else if (cnt >= 160 && cnt < 180){
        state = 9;
      }else if (cnt >= 180 && cnt < 200){
        state = 10;
      }
      

      data = [cnt,state,current,voltage,power,time];
      allData.push(data);
    }
    console.log(allData);
    
    socket.broadcast.emit('btStateStart', allData);
    socket.emit('btStateStart', allData);
  });
 
  // console.log(allData);
});
