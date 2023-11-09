// 导入 express 模块
const express = require('express')
// 导入 cors 中间件
const cors = require('cors')
// 导入joi验证表单
const joi = require('joi')
// 导入express-jwt解析token
const expressjwt = require('express-jwt')
// 导入解析token的密钥
const config = require('./config')

// 创建 express 的服务器实例
const app = express()
app.use(express.urlencoded({extended:false}))
// write your code here...
app.use(cors())
// 注册解析token
app.use(expressjwt({ secret: config.jwtsecretkey}).unless({ path: [/^\/api\//]}))

// 封装响应处理错误请求模块中间件
app.use((req, res, next) => {
  res.dataRes = (msg, status = 1) => {
    res.send({
      status,
      msg: msg instanceof Error ? msg.message : msg
    })
  }
  next()
})
// 导入并注册用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)
// 导入并注册用户信息详情路由模块
const userInfoRouter = require('./router/userInfo')
app.use('/my', userInfoRouter)
// 导入并注册文章分类路由模块
const artcateRouter = require('./router/artcate')
app.use('/my/article', artcateRouter)
// 导入并注册文章管理路由模块
const articleRouter = require('./router/article')
app.use('/my/article', articleRouter)
// 错误中间件
app.use((err, req, res, next) => {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.dataRes(err)
  // 身份验证失败
  if (err.name === 'UnauthorizedError') return res.send({
    status: 1,
    msg: '身份验证失败'
  })
  
  // 其他错误
  res.dataRes(err)
})
// 将 cors 注册为全局中间件
app.use(cors())
// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3007, function () {
  console.log('api server running at http://127.0.0.1:3007')
})