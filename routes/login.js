const Router = require('koa-trie-router');
var constants = require('../configs/constants');
var helpers = require('../configs/helpers');
var contents = require('../configs/contents');
var loginHelper = require('../helpers/login_helper');
var middlewares = require('../configs/middlewares');
var models = require('../configs/models');

let router = new Router();

router.get('/login', [
  middlewares.sessionRequiredFalse, 
  async (ctx, next) => {
    ctx.status = 200;
    var lang = 'sp';
    var locals = {
      constants: constants.data,
      title: contents.titles()[lang]['login_index'],
      helpers: helpers,
      csss: loginHelper.indexCss(),
      jss: loginHelper.indexJs(),
      message: '',
      contents: contents.get('login')[lang],
      lang: lang,
    };
    await ctx.render('login/index', locals);
  }
]);

router.post('/login', [
  middlewares.sessionRequiredFalse, 
  async (ctx, next) => {
    ctx.status = 200;
    console.log("1 +++++++++++++++++++++++++++++++");
    console.log(ctx.request.body);
    console.log("2 +++++++++++++++++++++++++++++++");
    var lang = 'sp';
    var locals = {
      constants: constants.data,
      title: contents.titles()[lang]['login_index'],
      helpers: helpers,
      csss: loginHelper.indexCss(),
      jss: loginHelper.indexJs(),
      message: '',
      contents: contents.get('login')[lang],
      lang: lang,
    };
    await ctx.render('login/index', locals);
  }
]);

router.get('/login/sign_in', [
  async (ctx, next) => {
    ctx.status = 200;
    var lang = 'sp';
    var locals = {
      constants: constants.data,
      title: contents.titles()[lang]['login_sign_in'],
      helpers: helpers,
      csss: loginHelper.indexCss(),
      jss: loginHelper.indexJs(),
      message: '',
      contents: contents.get('login')[lang],
      lang: lang,
    };
    // await ctx.render('login/sign_in', locals);
    await ctx.redirect('/error/access/404');
  }
]);

router.get('/login/reset_password', [
  async (ctx, next) => {
    ctx.status = 200;
    var lang = 'sp';
    var locals = {
      constants: constants.data,
      title: contents.titles()[lang]['login_reset'],
      helpers: helpers,
      csss: loginHelper.indexCss(),
      jss: loginHelper.indexJs(),
      message: '',
      contents: contents.get('login')[lang],
      lang: lang,
    };
    await ctx.render('login/reset_password', locals);
  }
]);

exports.routes = router.middleware();