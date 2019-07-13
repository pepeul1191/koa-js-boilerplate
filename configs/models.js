const database = require('./database');

var type = database.db.type;

var Test = database.db.createModel('tests', {
  id: type.string(),
  title: type.string(),
  content: type.string(),
});

var User = database.db.createModel('users', {
  id: type.string(),
  user: type.string(),
  pass: type.string(),
  email: type.string(),
});

exports.Test = Test;
exports.User = User;
