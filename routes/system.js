const Router = require('koa-trie-router');
const mime = require('mime-types');
const fs = require('fs-extra')
var constants = require('../configs/constants');
var helpers = require('../configs/helpers');
var contents = require('../configs/contents');
var loginHelper = require('../helpers/login_helper');
var middlewares = require('../configs/middlewares');
var models = require('../configs/models');

let router = new Router();

router.get('/system/list', [
  //middlewares.sessionRequiredFalse,  
  async (ctx, next) => {
    var resp = {};
    var status = 200;
    var page = parseInt(ctx.request.query.page);
    var step = parseInt(ctx.request.query.step);
    var skip = (page - 1) * step;
    // get systems in range of page
    resp.systems = await models.System.find({}).select({ 
      name: 1, 
    }).skip(skip).limit(step).exec();
    // get count of systems
    resp.count = await models.System.countDocuments({});
    // response
    ctx.set('Content-Type', 'text/html; charset=utf-8');
    ctx.status = status;
    ctx.body = JSON.stringify(resp);
  }
]);

router.get('/system/get', [
  //middlewares.sessionRequiredFalse,  
  async (ctx, next) => {
    var resp = {};
    var status = 200;
    var _id = ctx.request.query._id
    // get systems
    var system = await models.System.findOne({
      _id: _id
    }).select({ 
      name: 1, 
    }).exec();
    // check if system exist
    if (system == null){
      status = 409;
      resp = 'Sistema no existe';
    }else{
      resp = system;
    }
    // get count of systems
    // response
    ctx.set('Content-Type', 'text/html; charset=utf-8');
    ctx.status = status;
    ctx.body = JSON.stringify(resp);
  }
]);

router.post('/system/save', [
  //middlewares.sessionRequiredFalse, 
  async (ctx, next) => {
    var status = 200;
    var resp = {
      action_executed: '',
    };
    try {
      var system_json = JSON.parse(ctx.request.body.data);
      if(system_json._id == 'E'){
        // create user
        // validate name must be unique in db
        var temp = await models.System.findOne({$or: [
          {name: system_json.name},
        ]}).exec();
        if(temp){
          // error, neither name nor email are unique
          status = 409;
          resp.action_executed = 'none';
          resp.data = 'Nombre de sistema repetido';
        }else{
          // create system
          var system = new models.System({
            name: system_json.name, 
            permissions_id: [],
          });
          var new_system = await system.save();
          resp.action_executed = 'create';
          resp._id = new_system._id;
        }
      }else{
        // edit system
        var temp1 = await models.System.findOne({
          name: system_json.name
        }).exec();
        var proceed = true;
        // check new system name is unique except himself
        if(temp1 != null){
          if(temp1._id != system_json._id){
            proceed = false;
          }
        }
        // proceed if pass two validations
        if(proceed){
          await models.System.findByIdAndUpdate(
            system_json._id,
            {
              $set: {
                name: system_json.name, 
              }
            }
          );         
          resp.action_executed = 'edit';
        }else{
          status = 409;
          resp.action_executed = 'none';
          resp.data = 'Nombre de sistema ya asignado';
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

router.post('/system/delete', [
  //middlewares.sessionRequiredFalse, 
  async (ctx, next) => {
    var status = 200;
    var resp = {
      action_executed: '',
    };
    try {
      var _id = ctx.request.body._id;
      await models.System.findOneAndDelete(_id);
      resp.action_executed = 'deleted';
      resp.data = 'Sistema eliminado';
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