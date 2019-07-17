const Router = require('koa-trie-router');
var constants = require('../configs/constants');
var helpers = require('../configs/helpers');
var contents = require('../configs/contents');
var loginHelper = require('../helpers/login_helper');
var middlewares = require('../configs/middlewares');
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
    await models.User.find({}, function(err, documents){
      if (err){
        status = 500;
        resp = JSON.parse([
          'Se ha producido un error en listar los usuarios en ese rango',
          err.toString()
        ]);
      }else{
        if(documents.length == 0){
          resp.users = [];
        }else{
          resp.users = documents;
        }
      }
    }).select({ 
      user: 1, 
      email: 2,
    }).skip(skip).limit(step);
    // get count of users
    await models.User.countDocuments({}, function(err, count){
      if (err){
        status = 500;
        resp = JSON.parse([
          'Se ha producido un error en contar los usuarios',
          err.toString()
        ]);
      }else{
        if(count.length == 0){
          resp.count = 0;
        }else{
          resp.count = count;
        }
      }
    });
    ctx.set('Content-Type', 'text/html; charset=utf-8');
    ctx.status = status;
    ctx.body = JSON.stringify(resp);
  }
]);

exports.routes = router.middleware();