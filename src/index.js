import Koa from 'koa'
import Router from './router'
import views from 'koa-views'
import koaBody from 'koa-body'

const app = new Koa()

// Must be used before any router is used
app.use(views('views'))

app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 2000*1024*1024*1024    // 设置上传文件大小最大限制，默认2M
  }
}))

// response router
app.use(async (ctx, next) => {
  await Router.routes()(ctx, next)
})

app.listen(3000)