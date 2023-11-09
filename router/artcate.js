// 导入express
const express = require('express')
// 导入验证数据中间件
const expressJoi = require('@escook/express-joi')
// 导入验证规则
const { add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema } = require('../schema/artcate')
// 导入文章分类处理函数
const artcate_handler = require('../router_handler/artcate')
// 导入路由
const router = express.Router()
// 获取文章分类列表路由
router.get('/cates', artcate_handler.getArticleCates)
// 新增文章分类
router.post('/addcates', expressJoi(add_cate_schema), artcate_handler.addArticleCates)
// 删除文章分类
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artcate_handler.deleteArticleCates)
// 获取文章分类详情
router.get('/cates/:id', expressJoi(get_cate_schema), artcate_handler.getArticleCatesInfo)
// 更新文章分类
router.post('/updatecate',expressJoi(update_cate_schema), artcate_handler.updateArticleCates)
module.exports = router