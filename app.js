const path = require('path');
const Koa = require('koa');
const static = require('koa-static');
const routes = require('koa-route');
const render = require('koa-ejs');
// export configs
const sockets = require('./configs/sockets');
var middleware = require('./configs/middlewares');
// export routes
const homeRouter =  require('./routes/home');
const errorRouter =  require('./routes/error');
const loginRouter =  require('./routes/login');
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
// sockets
sockets.registerApp(app);
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
app.use(loginRouter.routes);
// error
app.on('error', function (error) {
  console.log(error);
})
// port
app.listen(3000);
