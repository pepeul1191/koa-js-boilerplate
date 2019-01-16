const Koa = require('koa');
const static = require('koa-static');
const routes = require('koa-route');

const app = new Koa();

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(static(__dirname + '/public'));

const _r = {
  home: (ctx) => {
    ctx.body = 'petsss';
  },
};

app.use(routes.get('/', _r.home));

app.listen(3000);