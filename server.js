var express = require('express'),
	fs = require('fs');

var server = express();
server.use(express.static(__dirname + '/public'));

var port = 1337;
server.listen(port, function() {
	console.log('server listening on port ' + port);
});

/** Original simple HTTP server using plain node */
// var http = require('http'),
// 	fs = require('fs'),
// 	url = require('url');

// //Create a simple HTTP server
// var server = http.createServer(function(request, response) {
// 	response.writeHead(200, {'Content-Type': 'text/html'});
// 	response.write("<h1>Hello!</h1><p>You asked for <code>" + request.url + "</code></p>");
// 	response.end();
// 	return;
// });
// server.listen(1337); //set a listening port

// // Read a file
// fs.readFile('something.txt', 'utf8', function(error, text) {
// 	if (error) {
// 		throw error;
// 	}
// 	console.log('The file contains:', text); //logs last
// });

// //Write a file
// fs.writeFile('/public/temp/test.txt', 'It works, function(error) {
// 	if (error) {
// 		console.log('Failed to write file:', error);
// 	} else {
// 		console.log('File written.'); //logs second
// 	}
// });

// console.log('Server running at http://localhost:1337/'); //logs first