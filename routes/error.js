const Router = require('koa-trie-router');
var constants = require('../configs/constants');
//var helpers = require('../configs/helpers');

let router = new Router();

router.get('/error/access/404', async (ctx, next) => {
  ctx.status = 404;
  var locals = {
    constants: constants.data,
    title: 'Error',
    //helpers: helpers,
    //csss: errorHelper.accessCss(),
    //jss: errorHelper.accessJs(),
    numero: 8080,
    //contents: errorContent.content,
    //lang: middlewares.lang(req),
  };
  await ctx.render('error/access', locals);
});

exports.routes = router.middleware();