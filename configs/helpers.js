var yaml = require('js-yaml');
var fs   = require('fs');
const path = require('path');
const constants = require('./constants');

var loadCss = function(csss) {
  var rpta = '';
  console.log(csss);
  
  if (typeof csss != 'undefined'){
    for(var i = 0; i < csss.length; i++){
      rpta = rpta + '<link rel="stylesheet" type="text/css" href="'+ constants.data.static_url + csss[i] + '.css" />'
    }
  }
  return rpta;
}

var loadJs = function(jss) {
  var rpta = '';
  if (typeof jss != 'undefined'){
    for(var i = 0; i < jss.length; i++){
      rpta = rpta + '<script src="' + constants.data.static_url + jss[i] + '.js"></script>'
    }
  }
  return rpta;
}

var contents = function(file){
  var file_route = path.join(__dirname, '../contents', file + '_content.yml');
  return yaml.safeLoad(fs.readFileSync(file_route), 'utf8');
}

exports.loadCss = loadCss;
exports.loadJs = loadJs;
exports.contents = contents;
