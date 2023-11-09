const express = require('express')
// 导入路由处理模块
const userHandler = require('../router_handler/user')
// 1. 导入验证表单中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')

// 创建路由对象
const router = express.Router()

// 注册新用户
router.post('/register', expressJoi(reg_login_schema), userHandler.register)

// 登录
router.post('/login', expressJoi(reg_login_schema), userHandler.login)

// 将路由对象共享出去
module.exports = router