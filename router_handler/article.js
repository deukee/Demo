
// 导入解析formdata数据的中间件
const multer = require("multer")
// 导入地址模块
const path = require('path')

// 创建multer的实例对象,通过desc指定文件存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })
// 发布新文章的处理函数
exports.addArticle = (req, res) => {
  console.log(req.body) // 文本类型的数据
  console.log('--------分割线----------')
  console.log(req.file) // 文件类型的数据

  res.send('ok')
}
exports.upload = upload
// module.exports = {upload}