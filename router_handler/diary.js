const db = require('../database/index')
exports.getDiaryData = (req, res) => {
    console.log(req.params)
    const sql = 'select dno from diary_info where username = ?'
    db.query(sql, req.params.username, (err, results) => {
        if(err) return res.cc(err)
            // console.log(results[0])
        const sql = 'select * from diary_item where dno = ?'
        db.query(sql, results[0].dno, (err, results1) => {
            if(err) return res.cc(err)
            res.send({
                status: 200,
                data: results1
            })
        })
    })
}