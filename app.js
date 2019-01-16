const path = require('path');
const Koa = require('koa');
const static = require('koa-static');
const routes = require('koa-route');
const render = require('koa-ejs');
var middleware = require('./configs/middlewares');
const homeRouter =  require('./routes/home');
const errorRouter =  require('./routes/error');
// new app
const app = new Koa();
// views EJS
render(app, {
  root: path.join(__dirname, 'views'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false
});
// middlewares
app.use(middleware.preResponse());
app.use(middleware.showLogs());
// static files
app.use(static(__dirname + '/public'));
// routes
const _r = {
  home: (ctx) => {
    ctx.set('Content-Type', 'text/html');
    ctx.body = '<h1>petsss</h1>';
  },
};
app.use(routes.get('/home', _r.home));
app.use(routes.get('/test', (ctx) => {
  ctx.set('Content-Type', 'text/html');
  ctx.body = 'ok';
}));
app.use(homeRouter.routes);
app.use(errorRouter.routes);
// port
app.listen(3000);