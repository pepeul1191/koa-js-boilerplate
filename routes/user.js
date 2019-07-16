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
    var resp = '';
    var status = 200;
    await models.User.find({}, function(err, documents){
      if (err){
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        status = 500;
        resp = JSON.parse([
          'Se ha producido un error en buscar los distritos del provincia',
          err.toString()
        ]);
      }else{
        if(documents.length == 0){
          resp = JSON.stringify(['colección vacíañ', 1, 'hola']);
          //res(rpta).code(200);
        }else{
          resp = JSON.stringify(documents);
        }
      }
    }).select({ 
      user: 1, 
      email: 2,
    });
    ctx.set('Content-Type', 'text/html; charset=utf-8');
    ctx.status = status;
    ctx.body = resp;
  }
]);

exports.routes = router.middleware();