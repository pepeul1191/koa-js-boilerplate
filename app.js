const path = require('path');
const Koa = require('koa');
const static = require('koa-static');
const routes = require('koa-route');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const koaBody = require('koa-body');
// export configs
const sockets = require('./configs/sockets');
const middlewares = require('./configs/middlewares');
const constants = require('./configs/constants');
// export routes
const homeRouter = require('./routes/home');
const errorRouter = require('./routes/error');
const loginRouter = require('./routes/login');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');
// new app
const app = new Koa();
app.keys = ['rnbfpzfuywmiwtfrrlomwlzlhdxfxjnfifzvkrloobswyoifkt'];
app.use(bodyParser());
app.use(session(constants.session, app));
app.use(koaBody(constants.uploader_options));
// views EJS
render(app, {
  root: path.join(__dirname, 'views'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false
});
// middlewares
app.use(middlewares.preResponse());
app.use(middlewares.showLogs());
// sockets
sockets.registerApp(app);
// static files
app.use(static(__dirname + '/public'));
// plain routes
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
// forward routes
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = 500; //err.status || 500;
    console.log(err);
    console.log(err.stack);
    ctx.body = err.stack;
  }
});
app.use(homeRouter.routes);
app.use(errorRouter.routes);
app.use(loginRouter.routes);
app.use(adminRouter.routes);
app.use(userRouter.routes);
// error 404 handler
app.use(middlewares.errorNotFoundHandler);
/*
app.on('error', function (error) {
  console.log('1 ++++++++++++++++++++++')
  console.log(error);
  console.log('2 ++++++++++++++++++++++')
  ctx.set('Content-Type', 'text/html; charset=utf-8');
  ctx.status = 500;
  ctx.body = error;
})
*/


/*
app.on('error', async (err, ctx, next) => {
  console.log('1++++++++++++++++++++++++++++++++++++');
  ctx.set('Content-Type', 'text/html; charset=utf-8');
  ctx.status = 200;
  console.log(err.toString());
  console.log('2++++++++++++++++++++++++++++++++++++');
  //ctx.body = err.toString();
  console.log(ctx.body);
  console.log('3++++++++++++++++++++++++++++++++++++');
  //ctx.app.emit('error', err, ctx);
  return await ctx.render('error/500');
  console.log('4++++++++++++++++++++++++++++++++++++');
});
*/
// port
app.listen(3000);
