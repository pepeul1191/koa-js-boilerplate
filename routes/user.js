const Router = require('koa-trie-router');
const mime = require('mime-types');
const fs = require('fs-extra')
var helpers = require('../configs/helpers');
var models = require('../configs/models');

let router = new Router();

router.get('/user/list', [
  //middlewares.sessionRequiredFalse,  
  async (ctx, next) => {
    var resp = {};
    var status = 200;
    var page = parseInt(ctx.request.query.page);
    var step = parseInt(ctx.request.query.step);
    var skip = (page - 1) * step;
    // get users in range of page
    resp.users = await models.User.find({}).select({ 
      user: 1, 
      email: 2,
    }).skip(skip).limit(step).exec();
    // get count of users
    resp.count = await models.User.countDocuments({});
    // response
    ctx.set('Content-Type', 'text/html; charset=utf-8');
    ctx.status = status;
    ctx.body = JSON.stringify(resp);
  }
]);

router.get('/user/get', [
  //middlewares.sessionRequiredFalse,  
  async (ctx, next) => {
    var resp = {};
    var status = 200;
    var _id = ctx.request.query._id
    // get users
    var user = await models.User.findOne({
      _id: _id
    }).select({ 
      user: 1, 
      email: 2,
      profile_picture: 3,
      state_id: 4,
    }).exec();
    // check if user exist
    if (user == null){
      status = 409;
      resp = 'Usuario no existe';
    }else{
      resp = user;
    }
    // get count of users
    // response
    ctx.set('Content-Type', 'text/html; charset=utf-8');
    ctx.status = status;
    ctx.body = JSON.stringify(resp);
  }
]);

router.post('/user/picture/upload', [
  //middlewares.sessionRequiredFalse, 
  async (ctx, next) => {
    var resp = '';
    try {
      var {path, name, type} = ctx.request.files.picture_file;
      var file_extension = mime.extension(type);
      name = helpers.random(30) + '.' + file_extension;
      await fs.copy(path, `public/uploads/${name}`);
      resp = name;
    } catch (err) {
      ctx.throw(500, err);
    }
    // response
    ctx.set('Content-Type', 'text/html; charset=utf-8');
    ctx.status = 200;
    ctx.body = resp;
  }
]);

router.post('/user/save', [
  //middlewares.sessionRequiredFalse, 
  async (ctx, next) => {
    var status = 200;
    var resp = {
      action_executed: '',
    };
    try {
      var user_json = JSON.parse(ctx.request.body.data);
      if(user_json._id == 'E'){
        // create user
        // validate user and email must be unique in db
        var temp = await models.User.findOne({$or: [
          {user: user_json.user},
          {email: user_json.email},
        ]}).exec();
        if(temp){
          // error, neither user nor email are unique
          status = 409;
          resp.action_executed = 'none';
          resp.data = 'Usuario y/o correo repetidos';
        }else{
          // create user
          var user = new models.User({
            user: user_json.user, 
            pass: user_json.pass, 
            email: user_json.email, 
            profile_picture: user_json.profile_picture, 
            state_id: user_json.state_id,
            systems: [],
          });
          var new_user = await user.save();
          resp.action_executed = 'create';
          resp._id = new_user._id;
        }
      }else{
        // edit user
        var temp1 = await models.User.findOne({
          user: user_json.user
        }).exec();
        var proceed = true;
        // check new user name is unique except himself
        if(temp1 != null){
          if(temp1._id != user_json._id){
            proceed = false;
          }
        }
        // check new user email is unique except himself
        if(proceed == true){
          var temp2 = await models.User.findOne({
            email: user_json.email
          }).exec();
          if(temp2 != null){
            if(temp2._id != user_json._id){
              proceed = false;
            }
          }
        }
        // proceed if pass two validations
        if(proceed){
          if(user_json.pass == ''){
            // not update the pass
            await models.User.findByIdAndUpdate(
              user_json._id,
              {
                $set: {
                  user: user_json.user, 
                  email: user_json.email, 
                  profile_picture: user_json.profile_picture, 
                  state_id: user_json.state_id,
                }
              }
            );
          }else{
            // update the pass
            await models.User.findByIdAndUpdate(
              user_json._id,
              {
                $set: {
                  user: user_json.user, 
                  pass: user_json.pass, 
                  email: user_json.email, 
                  profile_picture: user_json.profile_picture, 
                  state_id: user_json.state_id,
                }
              }
            );
          }
          
          resp.action_executed = 'edit';
        }else{
          status = 409;
          resp.action_executed = 'none';
          resp.data = 'Usuario y/o correo ya asignados a un usuario';
        }
      }
    } catch (err) {
      ctx.throw(500, err);
    }
    // response
    ctx.set('Content-Type', 'text/html; charset=utf-8');
    ctx.status = status;
    ctx.body = JSON.stringify(resp);
  }
]);

exports.routes = router.middleware();