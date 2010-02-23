var sys = require("sys"), http = require("http");

exports.db = new function(){
	var _port = 5984;
	var _host = '127.0.0.1';
	var _reponse = {};
	
	var _call = function(action, path, param, success_status){		
		if(action == 'get'){
			
			var connection = http.createClient(_port, _host);
		  var request = connection.get("/monkey/_all_docs", {"host": "localhost"});

		  request.finish(function (response) {
		  	response.setBodyEncoding("utf8");

		  	var response_body_str = "";
		  	if(response.statusCode == success_status){
		 			response.addListener("body", function (chunk) {
						response_body_str += chunk;
		   		});

		   		response.addListener("complete", function() {
						param.success(JSON.parse(response_body_str));
		   		});
		 		}
		 		else param.error('invalid response');
			});
		}
	}
	
	return{
		public_var: 'my public var',
		
		set_host: function(host){
			_host = host;
			return true;
		},
		
		set_port: function(port){
			_port = port;
			return true;
		},
		
		get_connection_info: function(){
			return _host + ':' + _port;
		},
		
		all_docs: function(param){
			_call('get','_all_docs',param,200);	
		}
	}
}