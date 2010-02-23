var sys = require("sys"),
	http = require("http");
	posix = require("posix");

http.createServer(function (req, res) {
	res.sendHeader(200, {'Content-Type': 'text/html'});
	
	var couch = http.createClient(5984, "localhost");
	var request = couch.get("/monkey/_all_docs", {"host": "localhost"});
	var template = posix.cat('template.html').wait();
	
	request.finish(function (response) {
	  response.setBodyEncoding("utf8");

		var response_body_str = "";
		if(response.statusCode == 200){
			response.addListener("body", function (chunk) {
				response_body_str += chunk;
		  });

			response.addListener("complete", function() {
				response_body = JSON.parse(response_body_str);
				template = template.replace("__total_records__",response_body.total_rows);
				template = template.replace("__json__",JSON.stringify(response_body));
				res.sendBody(template);
				res.finish();
			});
		}
		else sys.puts('invalid responce');
	});
}).listen(8001);

sys.puts('Server running at http://127.0.0.1:8001/');