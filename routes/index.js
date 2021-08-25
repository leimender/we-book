const Router = require('koa-router')
const router = new Router()
const appointment = require('./appointment')
const user = require('./users')

export default app => {
  user(router)
  appointment(router)
  app.use(router.routes())
  .use(router.allowedMethods())
}
