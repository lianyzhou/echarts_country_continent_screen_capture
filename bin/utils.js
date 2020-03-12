var path = require("path");
var fs = require("fs");

var continentMap = {
  "asia": "亚洲",
  "northAmerica": "北美洲",
  "southAmerica": "南美洲",
  "oceania": "大洋洲",
  "europe": "欧洲",
  "africa": "非洲",
};


function continentExist() {
  for (var key in continentMap) {
    var exist = fs.existsSync(path.resolve(__dirname, "../json/region/world/" + key + "High.json"));
    if (!exist) {
      console.log(key + "文件不存在");
    }
  }
}

function readJson(filePath) {
  var fileContent = fs.readFileSync(filePath, "utf8");
  var json = eval('(' + fileContent + ')');
  return json;
}

var contry2Map = readJson(path.resolve(__dirname, "../json/data/countries.json"))
var countryChinesNameMap = readJson(path.resolve(__dirname, "../json/lang/cn_ZH.json"));

// 生成图片路径
function generatePngPaths() {
  var result = [
    {
      mapType: "worldHigh",
      geoJson: ["worldHigh.json"],
      fileName: "世界各国家.png",
    },
    {
      mapType: "worldRegionsHigh",
      geoJson: ["region/world/worldRegionsHigh.json"],
      fileName: "世界各大洲.png"
    },
  ];

  for (var key in continentMap) {
    var directory = continentMap[key];
    var json = readJson(path.resolve(__dirname, "../json/region/world/" + key + "High.json"));
    result.push({
      mapType: key,
      geoJson: ["region/world/" + key + "High.json"],
      fileName: continentMap[key] + "/" + continentMap[key] + ".png"
    });
    json.features.forEach(function(obj) {
      if (!contry2Map[obj.id]) {
        return;
      }
      var fileNames = contry2Map[obj.id].filter((item) => item.indexOf("High") >= 0).map((str) => {
        return str + ".json";
      });
      result.push({
        mapType: obj.id,
        geoJson: fileNames,
        fileName: continentMap[key] + "/" + countryChinesNameMap[obj.id] + ".png"
      });
    });
  }
  return result;
}

exports.generatePngPaths = generatePngPaths;
