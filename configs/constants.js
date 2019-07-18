const data = {
  sistema_id: 1,
  base_url: 'http://localhost:3000/',
  static_url: 'http://localhost:3000/',
  static: 'dev',
  csrf: {
    secret: 'mpt/sr6eS2AlCRHU7DVThMgFTN08pnfSDf/C94eZx7udfm0lvgaYWLYJttYPKzGKDTlXwVU/d2FOxbKkgNlsTw==',
    key: 'csrf_val'
  },
};

const services = {
  accesos: {
    url: 'http://localhost:4000/',
    'csrf_key': 'csrf_val',
    'csrf_value': 'PKBcauXg6sTXz7Ddlty0nejVgoUodXL89KNxcrfwkEme0Huqtj6jjt4fP7v2uF4L',
  },
};

const session = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

const middlewares = {
  csrf : true,
  session : false,
  session_admin : true,
  logs : true,
  csrf_check: true, 
};

const admin = {
  user: 'admin',
  pass: 'sistema123'
};

const uploader_options = {
  multipart: true, 
  uploadDir: '.',
  urlencoded: true,
};

exports.data = data;
exports.services = services;
exports.middlewares = middlewares;
exports.admin = admin;
exports.session = session;
exports.uploader_options = uploader_options;
