var db = require('./database');

var User = db.mongoose.model('users',
  new db.Schema(
    {
      user:  String,
      pass: String,
      email: String,
      profile_picture: String,
      status: String,
    }
  )
);

exports.User = User;
