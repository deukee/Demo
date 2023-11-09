const db = require('../db/index')
const jwt = require('jsonwebtoken')
const config = require('../config')
exports.register = (req, res) => {
  // 检查表单数据是否合法
  const userInfo = req.body
  if (!userInfo.username || !userInfo.password) {
    return res.dataRes('用户名或者密码不能为空')
    // res.send({
    //   status: 1,
    //   msg: '用户名或者密码不能为空'
    // })
  }
  // 检测注册用户是否存在
  const sqlStr = 'select * from ev_users where username=?'
  db.query(sqlStr, userInfo.username, (err, results) => {
    // 执行语句失败
    if (err) {return res.dataRes(err)}
    // 用户名被占用
    if (results.length > 0) {return res.dataRes('用户名被占用')}
    const sqlStr = 'insert into ev_users set ?'
    db.query(sqlStr, {username: userInfo.username, password: userInfo.password}, (err, results) => {
      if (err) { return res.dataRes(err)}
      // 影响行数不为1
      if (results.affectedRows !== 1) return res.dataRes('注册失败,请稍后再试')
      res.dataRes('注册成功', 0)
      // res.send({
      //   status: 200,
      //   msg: '注册成功',
      // })
    })
    
  })
  
}
exports.login = (req, res) => {
  // 1.检验表单数据是否合法,在路由中完成
  // 2.判断提交用户在数据库是否存在
  const body = req.body
  const sqlStr = `select * from ev_users where username=?`
  db.query(sqlStr, body.username, (err, results) => {
    // sql执行错误
    if (err) return res.dataRes(err)
    // 查询的结果长度不等于一
    if (results.length !== 1) {
      return res.dataRes('账号不存在')
    }
    // 结果唯一验证密码是否正确
    if (body.password !== results[0].password) {
      return res.dataRes('密码错误')
    }
    const user = {...results[0], password: '', user_pic: ''}
    const token = jwt.sign(user, config.jwtsecretkey, {expiresIn: config.time})
    res.send({
      status: 0,
      msg: '登录成功',
      token: 'Bearer ' + token
    })
  })
  
}