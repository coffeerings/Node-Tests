var sys = require("sys");
sys.exec("ls /").addCallback(function (stdout, stderr) {
  sys.puts(stdout);
});