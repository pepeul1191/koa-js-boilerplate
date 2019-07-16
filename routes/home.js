const Router = require('koa-trie-router');
var constants = require('../configs/constants');
var helpers = require('../configs/helpers');
var contents = require('../configs/contents');
var middlewares = require('../configs/middlewares');
var homeHelper = require('../helpers/home_helper');

let router = new Router();

router.get('/', [
  async (ctx, next) => {
    ctx.status = 200;
    var lang = middlewares.getLanguage(ctx);
    var locals = {
      constants: constants.data,
      title: contents.titles()[lang]['home_index'],
      helpers: helpers,
      csss: homeHelper.indexCss(),
      jss: homeHelper.indexJs(),
      message: '',
      contents: contents.get('home')[lang],
      lang: lang,
    };
    await ctx.render('home/index', locals);
  }
]);

router.get('/xd', [
  async (ctx, next) => {
    ctx.set('Content-Type', 'text/html');
    ctx.body = 'xd';
  }
]);

exports.routes = router.middleware();
