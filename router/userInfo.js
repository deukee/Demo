const express = require('express')
// 导入获取用户信息处理函数
const userInfo_handler = require('../router_handler/userInfo')
// 导入验证中间件
const expressJoi = require('@escook/express-joi')
// 导入验证规则
const { update_userinfo_schema, update_avatar_schema } = require('../schema/userInfo')
const { update_password_schema } = require('../schema/user')
const router = express.Router()
// 获取用户信息路由
router.get('/userinfo', userInfo_handler.getUserInfo)
// 更改用户信息路由
router.post('/userinfo', expressJoi(update_userinfo_schema), userInfo_handler.postUserInfo)
// 重置密码路由
router.post('/updatepwd', expressJoi(update_password_schema), userInfo_handler.updatePassword)
// 更新用户头像
router.post('/update/avatar', expressJoi(update_avatar_schema), userInfo_handler.updateAvatar)
module.exports = router
