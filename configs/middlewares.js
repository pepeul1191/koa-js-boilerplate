var constants = require('./constants');

function preResponse(){
  return async (ctx, next) => {
    ctx.set('Server', 'Ubuntu');
    ctx.set('X-Powered-By', 'Node.js');
    await next();
  }
}

function showLogs(){
  if (constants.data.middleware_logs == 'able'){
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

exports.preResponse= preResponse;
exports.showLogs = showLogs;