var constants = require('../configs/constants');

var loginCss = function() {
  var rpta = [];
  if(constants.data.static == 'dev'){
    rpta = [
      'bower_components/bootstrap/dist/css/bootstrap.min',
      'bower_components/font-awesome/css/font-awesome.min',
      'assets/css/constants',
      'assets/css/styles',
      'assets/css/login',
    ];
  }
  if(constants.data.static == 'produccion'){
    rpta = [
      'dist/test.min'
    ];
  }
  return rpta;
}

var loginJs = function() {
  var rpta = [];
  if(constants.data.static == 'dev'){
    rpta = [
    ];
  }
  if(constants.data.static == 'produccion'){
    rpta = [
    ];
  }
  return rpta;
}

var indexCss = function() {
  var rpta = [];
  if(constants.data.static == 'dev'){
    rpta = [
      'bower_components/bootstrap/dist/css/bootstrap.min',
      'bower_components/font-awesome/css/font-awesome.min',
      'assets/css/constants',
      'assets/css/styles',
      'assets/css/index',
    ];
  }
  if(constants.data.static == 'produccion'){
    rpta = [
      'dist/test.min'
    ];
  }
  return rpta;
}

var indexJs = function() {
  var rpta = [];
  if(constants.data.static == 'dev'){
    rpta = [
      'dist/admin',
    ];
  }
  if(constants.data.static == 'produccion'){
    rpta = [
    ];
  }
  return rpta;
}

exports.loginCss = loginCss;
exports.loginJs = loginJs;
exports.indexCss = indexCss;
exports.indexJs = indexJs;