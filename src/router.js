import Router from 'koa-router'
import fs from 'fs'
import path from 'path'

const router = new Router()

router.get('/', async (ctx, next) => {
  const title = 'koa2 title'

  await ctx.render('index', {
    title
  })
})

router.post('/api/uploadfile', async (ctx, next) => {
  // 上传单个文件
  const file = ctx.request.files.file; // 获取上传文件
  // 创建可读流
  const reader = fs.createReadStream(file.path);
  let filePath = path.join(__dirname, 'public/upload/') + `${file.name}`;
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);
  return ctx.body = "上传成功！"
})

// router.post('/uploadfiles', async (ctx, next) => {
//   // 上传多个文件
//   const files = ctx.request.files.file; // 获取上传文件
//   for (let file of files) {
//     // 创建可读流
//     const reader = fs.createReadStream(file.path);
//     // 获取上传文件扩展名
//     let filePath = path.join(__dirname, 'public/upload/') + `/${file.name}`;
//     // 创建可写流
//     const upStream = fs.createWriteStream(filePath);
//     // 可读流通过管道写入可写流
//     reader.pipe(upStream);
//   }
//  return ctx.body = "上传成功！";
// })

export default router