const db = require('../database/index')
exports.getTableTitle = (req, res) => {
    const sql = 'select tname as ptitle, uid from user_timetable where username = ?'
    db.query(sql, req.params.username, (err, results) => {
        if(err) return res.cc(err)
        res.send({
            status: 200,
            data: results
        })
    })
}
exports.getTableList = (req, res) => {
    console.log(req.params)
//    uid
    const sql ='select timetable.*,course_item.*, FLOOR((timetable.Sno-1)/12) as i, FLOOR((timetable.Sno-1)%12) as j from timetable, user_timetable, course_item, section_time where user_timetable.uid = ? and timetable.Sno = section_time.Sno and timetable.Tno = course_item.sec_id'
    db.query(sql, req.params.uid, (err, results) => {
        if(err) return res.cc(err)
        res.send({
            status: 200,
            data: results
        })
    })
}
//
exports.getMaxId = (req, res) => {
    const sql = 'select max(sec_id) as sec_id from course_item '
    db.query(sql, req.params.uid, (err, results) => {
        if(err) return res.cc(err)
        res.send({
            status: 200,
            data: results[0]
        })
    })
}
exports.addCourseItem = (req, res) => {
    const sql = 'insert into course_item set ?'
    db.query(sql, req.body, (err, results) => {
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('course_item数据库添加失败！')
        res.send({
            status: 200,
            message: 'course_item 添加项成功！'
        })
    })
}
exports.addTimeTable = (req, res) => {
    const sql = 'insert into timetable set ?'
    db.query(sql, req.body, (err, results) => {
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('timetable数据库添加失败！')
        res.send({
            status: 200,
            message: 'timetable添加项成功！'
        })
    })
}
