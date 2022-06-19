const db = require('../database/index')
exports.addTimes = (req, res) => {
    console.log(req.params)
    const sql = 'select username from time_info where username = ?'
    db.query(sql,req.params.username, (err, results) => {
        if(err) return res.cc(err)
        if(results.length === 0) {
            const sql = 'insert into time_info set username = ?,total1 = ?'
            db.query(sql, [req.params.username, req.params.s], (err, results) => {
                if(err) return res.cc(11)
                res.send({
                    status: 200,
                    data: null,
                    message: '添加全局时间记录成功！'

                })
            })
        }
        if(results.length > 0 ) {
            const sql = 'update time_info set total1 = total1 + ? where username = ?'
            db.query(sql, [ req.params.s, req.params.username], (err, results) => {
                if(err) return res.cc(err)
                res.send({
                    status: 200,
                    data: null,
                    message: '添加全局时间记录成功！'

                })
            })
        }
    })
}