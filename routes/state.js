const Router = require('koa-trie-router');
var models = require('../configs/models');

let router = new Router();

router.get('/state/list', [
  //middlewares.sessionRequiredFalse,  
  async (ctx, next) => {
    var resp = '';
    var status = 200;
    // get states
    resp = await models.State.find({}).exec();
    // response
    ctx.set('Content-Type', 'text/html; charset=utf-8');
    ctx.status = status;
    ctx.body = JSON.stringify(resp);
  }
]);

exports.routes = router.middleware();