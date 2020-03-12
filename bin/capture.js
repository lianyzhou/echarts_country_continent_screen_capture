var page = require("webpage").create();
var system = require('system');
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36';
var args = system.args;
var geoJson = args[1];
var width = args[2];
var height = args[3];
var output = args[4];
page.viewportSize = {width: width, height: height};
page.clipRect = {top: 0, left: 0, width: width, height: height};

page.open('http://127.0.0.1:8080', function(status) {
  if (status === 'success') {
    page.evaluate(function(paramObj) {
      window.renderChart({
        geoJson: JSON.parse(paramObj.geoJson),
        width: paramObj.width,
        height: paramObj.height
      });
    }, {
      geoJson: geoJson,
      width: width,
      height: height,
    });

    setTimeout(function() {
      page.render(output);
      phantom.exit();
    }, 1000);
  }
});