const Koa = require('koa');
const static = require('koa-static');
const routes = require('koa-route');
var middleware = require('./configs/middlewares');

const app = new Koa();

app.use(middleware.preResponse());
app.use(middleware.showLogs());

app.use(static(__dirname + '/public'));

const _r = {
  home: (ctx) => {
    ctx.set('Content-Type', 'text/html');
    ctx.body = '<h1>petsss</h1>';
  },
};

app.use(routes.get('/', _r.home));

app.listen(3000);