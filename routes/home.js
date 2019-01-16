const Router = require('koa-trie-router');

let router = new Router();

router.get('/', async (ctx, next) => {
  ctx.set('Content-Type', 'text/html');
  ctx.body = 'Hello';
});

router.get('/xd', async (ctx, next) => {
  ctx.set('Content-Type', 'text/html');
  ctx.body = 'xd';
});

exports.routes = router.middleware();