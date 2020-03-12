var generatePngPaths = require("./utils").generatePngPaths;
var paths = generatePngPaths();
var path = require("path");
var config = require("../config");
var child_process = require("child_process");

function doIt() {
  var params = paths.shift();
  if (!params) {
    return;
  }
  var strShells = ['phantomjs'];
  strShells.push(path.resolve(__dirname, "./capture.js"));
  strShells.push(JSON.stringify(JSON.stringify(params.geoJson)).replace(/^"/, '').replace(/"$/, ""));
  strShells.push(config.pngWidth);
  strShells.push(config.pngHeight);
  strShells.push(path.resolve(__dirname, "../dist", params.fileName));
  console.log(strShells.join(' '));
  child_process.exec(strShells.join(' '), {}, function(error, stdout, strerr) {
    doIt();
  });
}

doIt();