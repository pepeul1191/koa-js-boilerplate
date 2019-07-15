var constants = require('./constants');

// app middlewares

function preResponse(){
  return async (ctx, next) => {
    ctx.set('Server', 'Ubuntu');
    ctx.set('X-Powered-By', 'Node.js');
    await next();
  }
}

function showLogs(){
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

var sessionRequiredFalse = async function (ctx, next) {
  if (constants.middlewares.session) {
    return await ctx.redirect('/error/access/404');
  }
  return await next();
}

// socket io middlewares

async function preResponseSocket(ctx, next) {
  console.log('preResponseSocket middleware dice: ' + ctx.event);
  if(true){
    await next()
  }
}

exports.preResponse= preResponse;
exports.showLogs = showLogs;
exports.preResponseSocket = preResponseSocket;
exports.sessionRequiredFalse = sessionRequiredFalse;