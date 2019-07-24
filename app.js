const path = require('path');
const Koa = require('koa');
const static = require('koa-static');
const render = require('koa-ejs');
const session = require('koa-session');
const koaBody = require('koa-body');
// export configs
const sockets = require('./configs/sockets');
const middlewares = require('./configs/middlewares');
const constants = require('./configs/constants');
const routes = require('./configs/routes');
// new app
const app = new Koa();
app.keys = ['rnbfpzfuywmiwtfrrlomwlzlhdxfxjnfifzvkrloobswyoifkt'];
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
// error 500 handler
app.use(middlewares.internalErrorHandler);
// forward routes
routes.register(app);
// error 404 handler
app.use(middlewares.errorNotFoundHandler);
// port
app.listen(3000);
