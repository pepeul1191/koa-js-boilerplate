var db = require('thinky')(
  {
    host: 'localhost',
    port: 28015,
    authKey: '',
    db: 'thinkyex'
  }
);

exports.db = db;
