const Koa = require('koa');
const static = require('koa-static');
const routes = require('koa-route');

const app = new Koa();

app.use(static(__dirname + '/public'));

const _r = {
  home: (ctx) => {
    ctx.body = 'pets';
  },
};

app.use(routes.get('/', _r.home));

app.listen(3000);