var express=require('express'),
    http = require('http'),
    fs = require('fs'),
    path = require('path');
    exec = require('child_process').exec;
    sqlite3 = require('sqlite3');

sqlite3.verbose();
var db = new sqlite3.Database('data.db');
function readAllRows(res) {
    console.log("Read AllRows");
    db.all("SELECT device, sensor_name, sensor_type, sensor_data, time_stamp FROM sensor_data", function(err, rows) {
        console.log(JSON.stringify(rows));	    
	res.send(JSON.stringify(rows));
//	rows.forEach(function(row) {
//	    console.log(row.device + ": " + row.sensor_name);	
//	});
    
    
    });

}

function readnuc1Rows(res) {
    console.log("Read NUC1Rows");
    db.all("SELECT device, sensor_name, sensor_type, sensor_data, time_stamp FROM sensor_data where device = 'nuc1' and sensor_state=1", function(err, rows) {
        console.log(JSON.stringify(rows));	    
	res.send(JSON.stringify(rows));
//	rows.forEach(function(row) {
//	    console.log(row.device + ": " + row.sensor_name);	
//	});
    
    
    });

}

function readnuc2Rows(res) {
    console.log("Read NUC2Rows");
    db.all("SELECT device, sensor_name, sensor_type, sensor_data, time_stamp FROM sensor_data where device = 'nuc2' and sensor_state=1", function(err, rows) {
        console.log(JSON.stringify(rows));	    
	res.send(JSON.stringify(rows));
//	rows.forEach(function(row) {
//	    console.log(row.device + ": " + row.sensor_name);	
//	});
    
    
    });

}

var app = express();

// All your express server code goes here.
// ...
app.use(express.static(path.join(__dirname, 'public')));

app.get('/regisiter', function(req, res) {
  console.log("register sensor");
/*
  fs.open("test.txt","w",0644,function(e,fd){
    if(e) throw e;
    fs.write(fd,"first fs!",0,'utf8',function(e){
        if(e) throw e;
        fs.closeSync(fd);
    })
  });
*/
  exec('reg-test r',
     function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
	console.log('stderr: ' + stderr);
	if (error !== null) {
	   console.log('exec error: ' + error);
	}
     });
  res.send("");
});

app.get('/unregisiter', function(req, res) {
  console.log("unregster sensor");
/*
  fs.unlink("test.txt");
  res.send("");
*/
  exec('reg-test u',
     function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
	console.log('stderr: ' + stderr);
	if (error !== null) {
	   console.log('exec error: ' + error);
	}
     });
});

app.get('/send', function(req, res) {
  console.log(req.query.data);
  exec('reg-test ' + req.query.data,
     function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
	console.log('stderr: ' + stderr);
	if (error !== null) {
	   console.log('exec error: ' + error);
	}
     });

  res.send("");
});

app.get("/", function(req, res) {
  console.log("New visiter");
  res.sendFile("/home/guchaojie/work/ioT/web_demo/public/home.html");
});

app.get("/data", function(req, res) {
  console.log("data coming");
  readAllRows(res);

});

app.get("/data1", function(req, res) {
  console.log("data1 coming");
  readnuc1Rows(res);

});

app.get("/data2", function(req, res) {
  console.log("data2 coming");
  readnuc2Rows(res);

});

//readnuc1Rows();

module.exports = app;
