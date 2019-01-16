const data = {
  sistema_id: 1,
  base_url: 'http://localhost:3000/',
  static_url: 'http://localhost:3000/',
  static: 'desarrollo',
  middleware_csrf : 'able',
  middleware_session : 'disable',
  middleware_logs : 'able',
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
}

exports.data = data;
exports.services = services;
