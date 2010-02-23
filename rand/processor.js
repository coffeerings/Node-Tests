/*
 HTTP Lister processes incoming messages and adds to data store 
*/
var sys = require('sys'), 
   http = require('http');

http.createServer(function (req, res) {
	sys.puts(req.uri.queryString);
	
	for(var key in req.uri.params){
		sys.puts(key + ' = ' + req.uri.params[key]);
	}
	
	res.sendHeader(200, {'Content-Type': 'text/plain'});
  res.sendBody('Hello World');
  res.finish();
}).listen(8000);
sys.puts('Server running at http://127.0.0.1:8000/');