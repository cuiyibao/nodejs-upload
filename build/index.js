'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _koaViews = require('koa-views');

var _koaViews2 = _interopRequireDefault(_koaViews);

var _koaBody = require('koa-body');

var _koaBody2 = _interopRequireDefault(_koaBody);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();

// Must be used before any router is used
app.use((0, _koaViews2.default)('views'));

app.use((0, _koaBody2.default)({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
  }
}));

// response router
app.use(async function (ctx, next) {
  await _router2.default.routes()(ctx, next);
});

app.listen(3000);