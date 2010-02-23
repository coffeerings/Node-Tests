var sys = require("sys");
var	couch = require("./couch");
var result;

var all_docs = function(result){
	sys.puts('Total rows: ' + result.total_rows);
	sys.puts('Rows: ' + JSON.stringify(result.rows));
}
couch.db.all_docs({ success : function(response){ all_docs(response); }, error : function(response){ sys.puts(response); } });


