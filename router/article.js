const express = require('express')
const article_handler = require('../router_handler/article')
const {upload} = require('../router_handler/article')
const router = express.Router()
router.post('/add', upload.single('cover_img'), article_handler.addArticle)
module.exports = router