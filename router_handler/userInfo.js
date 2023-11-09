
// 导入数据库
const db = require('../db/index')

// 获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
  // 查询用户信息sql
  const sqlStr = `select id, username, nickname, email, user_pic from ev_users where id=?`
  db.query(sqlStr, req.user.id, (err, results) => {
    if(err) return res.dataRes(err)
    if (results.length !== 1) return res.dataRes('获取用户信息失败')
    res.send({
      status: 1,
      msg: '获取数据成功',
      data: results[0]
    })
  })
}
exports.postUserInfo = (req, res) => {
  const sqlStr = `update ev_users set ? where id=?`
  db.query(sqlStr,[req.body, req.body.id], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.dataRes(err)

    // 执行 SQL 语句成功，但影响行数不为 1
    if (results.affectedRows !== 1) return res.dataRes('修改用户基本信息失败！')

    // 修改用户信息成功
    res.dataRes('修改用户基本信息成功！', 0)
  })
}
exports.updatePassword = (req, res) => {
  // 首先查询用户信息,方便后续密码比对
  // 定义根据 id 查询用户数据的 SQL 语句
  const sql = `select * from ev_users where id=?`
  db.query(sql, req.user.id, (err, results) => {
    if(err) return res.dataRes(err)
    if (results.length !== 1) return res.dataRes('用户不存在')
    if (results[0].password !== req.body.oldPwd) return res.dataRes('旧密码错误,请检查')
    const sqlStr = `update ev_users set password=? where id=?`
    db.query(sqlStr, [req.body.newPwd, req.user.id], (err, results) => {
      if(err) return res.dataRes(err)
      // 执行 SQL 语句成功，但影响行数不为 1
      if (results.affectedRows !== 1) return res.dataRes('修改失败！')
      res.dataRes('修改成功', 0)
    })
  })
}
exports.updateAvatar = (req, res) => {
  const sqlStr = `update ev_users set user_pic=? where id=?`
  db.query(sqlStr, [req.body.avatar, req.user.id], (err, results) => {
    if (err) return res.dataRes(err)
    if (results.affectedRows !== 1) return res.dataRes('上传失败,请重新登录')
    res.dataRes('上传成功', 0)
  })
}