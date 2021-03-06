const Router = require('koa-trie-router');
var constants = require('../configs/constants');
var helpers = require('../configs/helpers');
var contents = require('../configs/contents');
var middlewares = require('../configs/middlewares');
var adminHelper = require('../helpers/admin_helper');

let router = new Router();

router.get('/admin/login', [
  middlewares.sessionAdminRequiredFalse, 
  async (ctx, next) => {
    ctx.status = 200;
    var lang = middlewares.getLanguage(ctx);
    var locals = {
      constants: constants.data,
      title: contents.titles()[lang]['admin_login'],
      helpers: helpers,
      csss: adminHelper.loginCss(),
      jss: adminHelper.loginJs(),
      message: '',
      message_status: '',
      contents: contents.get('admin')[lang],
      lang: lang,
    };
    await ctx.render('admin/login', locals);
  }
]);

router.post('/admin/login', [ 
  middlewares.sessionAdminRequiredFalse, 
  async (ctx, next) => {
    console.log('0 +++++++++++++++++++++++++++');
    var message = '';
    var lang = middlewares.getLanguage(ctx);
    var message_status = '';
    ctx.status = 200;
    console.log('1 ++++++++++++++++++++++++++');
    console.log(ctx.session.admin_login);
    console.log('2 ++++++++++++++++++++++++++');
    if(middlewares.CSRFValidateForm(ctx) != true){
      ctx.status = 500;
      message = contents.get('error')[lang].csrf.message_form;
      message_status = 'color-error';
    }
    if(constants.admin.user == ctx.request.body.user && 
      constants.admin.pass == ctx.request.body.pass){
      ctx.session.admin_login = true;
      return await ctx.redirect('/admin');
    }else{
      ctx.status = 500;
      message = contents.get('admin')[lang].login.login_user_not_found;
      message_status = 'color-error';
    }
    var locals = {
      constants: constants.data,
      title: contents.titles()[lang]['admin_login'],
      helpers: helpers,
      csss: adminHelper.loginCss(),
      jss: adminHelper.loginJs(),
      message: message,
      message_status: message_status,
      contents: contents.get('admin')[lang],
      lang: lang,
    };
    await ctx.render('admin/login', locals);
  }
]);

router.get('/admin', [ 
  middlewares.sessionAdminRequiredTrue, 
  async (ctx, next) => {
    return await ctx.redirect('/admin/#/');
  }
]);

router.get('/admin/', [ 
  middlewares.sessionAdminRequiredTrue, 
  async (ctx, next) => {
    ctx.status = 200;
    var lang = middlewares.getLanguage(ctx);
    var locals = {
      constants: constants.data,
      title: contents.titles()[lang]['admin_index'],
      helpers: helpers,
      csss: adminHelper.indexCss(),
      jss: adminHelper.indexJs(),
      message: '',
      message_status: '',
      contents: contents.get('admin')[lang],
      lang: lang,
    };
    await ctx.render('admin/index', locals);
  }
]);

exports.routes = router.middleware();