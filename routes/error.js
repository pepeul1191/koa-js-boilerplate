const Router = require('koa-trie-router');

let router = new Router();

router.get('/error/access/404', async (ctx, next) => {
  ctx.status = 404;
  await ctx.render('error/access');
});

exports.routes = router.middleware();