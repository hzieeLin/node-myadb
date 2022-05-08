const { date } = require("joi")
const db = require('../database/index')
const jwt = require('jsonwebtoken')
const config = require('../config')
const bcrypt = require('bcryptjs')
exports.reg_User = (req, res) => {
   const sql = 'select * from user_info where username = ?'
   db.query(sql, req.body.username, (err, results) => {
       if(err) return res.cc(err)
       if(results.length > 0) return res.cc('用户名已被占用')
       req.body.password = bcrypt.hashSync(req.body.password, 10)
       const sql = 'insert into user_info set ?'
       db.query(sql, req.body, (err, results) => {
           if(err) return res.cc(err)
           if(results.affectedRows !== 1) return res.cc('用户注册失败！')
           res.send({
               status: 200,
               message: '用户注册成功！'
           })
       })
   })
}
exports.editCreateName = (req, res) => {
    console.log(req.body)
    const sql = 'select create_name from user_info where create_name = ? and username != ? '
    db.query(sql, [req.body.create_name,req.body.username], (err, results) => {
        if(err) return res.cc(err)
        if(results.length > 0) return res.cc('该昵称已被占用')
        if(!req.body.create_name) return  res.cc('昵称不能为空！')
        const sql = 'update user_info set create_name = ?, gender = ?, modified_time = ? where username = ?'
        db.query(sql, [req.body.create_name,req.body.gender,req.body.modified_time,req.body.username], (err, results) => {
            if(err) return res.cc(err)
            res.send({
                status: 200,
                message: '用户信息修改成功！'
            })
        })
    })
}
exports.login_User = (req, res) => {
   const sql = 'select * from user_info where username = ?'
    db.query(sql, req.body.username, (err, results) => {
        if(err) return res.cc(err)
        if(results.length === 0) return res.cc('不存在该用户名请先注册！')
        const compareResult = bcrypt.compareSync(req.body.password, results[0].password)
        if(!compareResult) {
            return res.cc('密码错误！请重新输入！')
        }
        const user = {...results[0].username}
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {expiresIn: '10h'})
        res.send({
            status: 200,
            message: '用户登录成功！',
            token: 'Bearer ' + tokenStr
        })
    })
}
exports.getUserCreateName = (req, res) => {
    const sql = 'select * from user_info where username = ?'
    db.query(sql, req.params.name, (err, results) => {
        if(err) return res.cc(err)
        if(results.length !== 1) return res.cc('数据库异常，用户名不止一个！')
        res.send({
            status: 200,
            data: results[0]
        })
    })
}
exports.getUserInfo = (req, res) => {
    const sql = 'select * from user_info where username = ?'
    db.query(sql, req.params.name, (err, results) => {
        if(err) return res.cc(err)
        if(results.length !== 1) return res.cc('数据库异常，用户名不止一个！')
        res.send({
            status: 200,
            data: results[0]
        })
    })
}
