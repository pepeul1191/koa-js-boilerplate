const database = require('./database');

var type = database.db.type;

var Test = database.db.createModel('tests', {
  id: type.string(),
  title: type.string(),
  content: type.string(),
});

exports.Test = Test;
