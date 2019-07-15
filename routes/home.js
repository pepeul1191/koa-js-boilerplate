const Router = require('koa-trie-router');
var constants = require('../configs/constants');
var models = require('../configs/models');
var helpers = require('../configs/helpers');
var contents = require('../configs/contents');
var homeHelper = require('../helpers/home_helper');

let router = new Router();

router.get('/', [
  async (ctx, next) => {
    ctx.status = 200;
    var lang = 'sp';
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

router.get('/db/insert', [
  async (ctx, next) => {
    var demo = new models.Test({
      title: 'Michel',
      content: 'hola mudo',
    });
    var rpta;
    await demo.save().then(function(result) {
      /*
      post = result = {
          id: "0e4a6f6f-cc0c-4aa5-951a-fcfc480dd05a",
          title: "Hello World!",
          content: "This is an example.",
          idAuthor: "3851d8b4-5358-43f2-ba23-f4d481358901",
          author: {
              id: "3851d8b4-5358-43f2-ba23-f4d481358901",
              name: "Michel"
          }
      }
      */
      console.log(result.id);
      ctx.set('Content-Type', 'text/html');
      rpta = result.id;
    }).error(function(res){
      console.log(res);
      rpta = JSON.stringify(res);
    });
    ctx.set('Content-Type', 'text/html');
    ctx.body = rpta;
  }
]);

exports.routes = router.middleware();
