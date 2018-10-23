'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _koaRouter2.default();

router.get('/', async function (ctx, next) {
  var title = 'koa2 title';

  await ctx.render('index', {
    title: title
  });
});

router.post('/api/uploadfile', async function (ctx, next) {
  // 上传单个文件
  var file = ctx.request.files.file; // 获取上传文件
  // 创建可读流
  var reader = _fs2.default.createReadStream(file.path);
  var filePath = path.join(__dirname, 'public/upload/') + ('/' + file.name);
  // 创建可写流
  var upStream = _fs2.default.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);
  return ctx.body = "上传成功！";
});

exports.default = router;