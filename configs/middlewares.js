var constants = require('./constants');

// app middlewares

var preResponse = function(){
  return async (ctx, next) => {
    ctx.set('Server', 'Ubuntu');
    ctx.set('X-Powered-By', 'Node.js, ^koa$');
    await next();
  }
}

var showLogs = function(){
  if (constants.middlewares.logs){
    return async (ctx, next) => {
      await next();
      const rt = ctx.response.get('X-Response-Time');
      console.log(`${ctx.method} ${ctx.status} ${ctx.url} - ${rt}`);
    }
  } else{
    return async (ctx, next) => {
      await next();
    };
  }
}

// action middlewares

var sessionRequiredFalse = async function (ctx, next){
  if (constants.middlewares.session) {
    return await ctx.redirect('/error/access/404');
  }
  return await next();
}

var CSRFValidateForm = function (ctx){
  if (constants.middlewares.csrf_check) {
    var app_csrf_key = constants.data.csrf.key;
    var app_csrf_secret = constants.data.csrf.secret;
    var rq_csrf_secret = ctx.request.body[app_csrf_key];
    if(app_csrf_secret == rq_csrf_secret){
      return true;        
    }else{
      return false;
    }
  }else{
    return true;
  }
}

// socket io middlewares

var preResponseSocket = async function (ctx, next){
  console.log('preResponseSocket middleware dice: ' + ctx.event);
  if(true){
    await next()
  }
}

exports.preResponse= preResponse;
exports.showLogs = showLogs;
exports.preResponseSocket = preResponseSocket;
exports.sessionRequiredFalse = sessionRequiredFalse;
exports.CSRFValidateForm = CSRFValidateForm;