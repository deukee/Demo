
// 导入数据库
const db = require('../db/index')
// 获取文章分类处理函数
exports.getArticleCates = (req, res) => {
  const sql = `select * from ev_article_cate where user_id=? and is_delete=0 order by id asc`
  db.query(sql, req.user.id, (err, results) => {
    if (err) return res.dataRes(err)
    // if (results.length !== 1) return res.dataRes('没有数据')
    res.send({
      status: 0,
      msg: '获取数据成功',
      data: results
    })
  })
}
exports.addArticleCates = (req, res) => {
  // 查询插入数据是否被占用
  const sql = `select * from ev_article_cate where user_id=? and (name=? or alias=?) and is_delete=0`
  db.query(sql, [req.user.id, req.body.name, req.body.alias], (err, results) => {
    if (err) return res.dataRes(err)
    if (results.length === 2) return res.dataRes('分类名和别名都被占用,请更换')
    if (results.length === 1 && results[0].alias === req.body.alias && results[0].name === req.body.name) return res.dataRes('分类名和别名都被占用,请更换')
    if (results.length === 1 && results[0].name === req.body.name) return res.dataRes('分类名被占用')
    if (results.length === 1 && results[0].alias === req.body.alias) return res.dataRes('别名被占用')
    const sql = `insert into ev_article_cate (name,alias,is_delete,user_id) values (?,?,0,?)`
    db.query(sql,[req.body.name,req.body.alias,req.user.id], (err, results) => {
      if (err) return res.dataRes(err)
      // SQL 语句执行成功，但是影响行数不等于 1
      if (results.affectedRows !== 1) return res.cc('新增文章分类失败！')
      res.send({status: 0,msg: '新增成功'})
    })
  })
}
exports.deleteArticleCates = (req, res) => {
  const sql = `update ev_article_cate set is_delete=1 where Id=?`
  db.query(sql, req.params.id, (err, results) => {
    if (err) return res.dataRes(err)
    // SQL 语句执行成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('新增文章分类失败！')
    res.dataRes('删除成功', 0)
  })
}
exports.getArticleCatesInfo = (req, res) => {
  const sql = `select * from ev_article_cate where Id=? and is_delete=0 and user_id=?`
  db.query(sql, [req.params.id, req.user.id], (err, results) => {
    if (err) return res.dataRes(err)
    if (results.length !== 1) return res.dataRes('数据不存在')
    res.send({
      status: 0,
      msg: '获取数据成功',
      data: results
    })
  })
}
exports.updateArticleCates = (req, res) => {
  // 选择属于当前用户的分类列表,并且id不等于当前修改的分类,且分类名或者别名等于数据且未删除的数据
  const sql = `select * from ev_article_cate where user_id=? and Id!=? and (name=? or alias=?) and is_delete=0`
  db.query(sql, [req.user.id, req.body.id, req.body.name, req.body.alias], (err, results) => {
    if (err) return res.dataRes(err)
    if (results.length === 2) return res.dataRes('分类名和别名已存在,请更换')
    if (results.length === 1 && results[0].alias === req.body.alias && results[0].name === req.body.name) return res.dataRes('分类名和别名都被占用,请更换')
    if (results.length === 1 && results[0].name === req.body.name) return res.dataRes('分类名已存在')
    if (results.length === 1 && results[0].alias === req.body.alias) return res.dataRes('别名已存在')
    const sql = `update ev_article_cate set name=?,alias=? where Id=?`
    db.query(sql, [req.body.name, req.body.alias, req.body.id], (err, results) => {
      if (err) return res.dataRes(err)
      if (results.affectedRows !== 1) return res.dataRes('更新失败')
      res.send({
        status: 0,
        msg: '更新成功',
      })
    })
  })
}