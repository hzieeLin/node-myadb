const db = require('../database/index')
/*
* 获取看板中的项目名称
* req.params.username 用户的username
* */
exports.getProjectTitle = (req, res) => {
    console.log(req.params.username);
//     -- 查询项目名称

// -- select pname from task where username = 'admin'
    const sql = 'select ptitle, no from pool where no = ?'
    db.query(sql, req.params.no, (err, results) => {
        if(err) return res.cc(err)
        res.send({
            status: 200,
            data: results
        })
    })
}
exports.getProjectTitle1 = (req, res) => {
    console.log(req.params.username);
//     -- 查询项目名称

// -- select pname from task where username = 'admin'
    const sql = 'select distinct ptitle, no from pool where no in (select no from task where username = ? )'
    db.query(sql, req.params.username, (err, results) => {
        if(err) return res.cc(err)
        res.send({
            status: 200,
            data: results
        })
    })
}
//获取列表的名称
exports.getPoolTitle = (req, res) => {
    const sql = 'select * from pool where no = ? ORDER BY index_id'
    db.query(sql, req.params.no, (err, results) => {
        if(err) return res.cc(err)
        res.send({
            status: 200,
            data: results
        })
    })
}
exports.getCardItem = (req, res) => {
    const sql = 'select * from card_item where pno = ? ORDER BY index_id'
    db.query(sql, req.params.pno, (err, results) => {
        if(err) return res.cc(err)
        res.send({
            status: 200,
            data: results
        })
    })
}
exports.addCardItem = (req, res) => {
    const sql = 'insert into card_item set ?'
    db.query(sql, req.body, (err, results) => {
        if(err) res.cc(err)
        if(results.affectedRows !== 1) return res.cc('添加卡片失败！')
        res.send({
            status: 200,
            message: null
        })
    })

}
exports.getMaxIndex = (req, res) => {
    const sql = 'select max(index_id) as maxindex from card_item where pno = ?'
    db.query(sql, req.params.pno, (err, results) => {
        if(err) return res.cc(err)
        res.send({
            status: 200,
            data: results[0]
        })
    })
}
exports.updateItemSort = (req, res) => {
    const sql = 'update card_item set index_id = 100 where pno = ? and index_id = ?'
    db.query(sql, [req.params.pno, req.params.newIndex], (err, results) => {
        if(err) return res.cc(err)
        if(results !== 0) {
            const sql = 'update card_item set index_id = ? where pno = ? and index_id = ?'
            db.query(sql, [req.params.newIndex, req.params.pno, req.params.oldIndex], (err, results) => {
                if(err) return res.cc(err)
                if(results !== 0) {
                    const sql = 'update card_item set index_id = ? where pno = ? and index_id = 100'
                    db.query(sql,  [req.params.oldIndex, req.params.pno], (err, results) => {
                        if(err) return res.cc(err)
                        res.send({
                            status: 200,
                            message: '交换成功'
                        })
                    })
                }
            })
        }
    })
}
exports.updateItemSort1 = (req, res) => {
    const sql = 'update card_item set index_id = 100 where pno = ? and index_id = ?'
    db.query(sql, [req.params.pno, req.params.oldIndex], (err, results) => {
        if(err) return res.cc(err)
        if(results !== 0) {
            const sql = 'update card_item set index_id = index_id -1 where pno = ? and (index_id > ? and index_id <= ?)'
            db.query(sql, [req.params.pno, req.params.oldIndex, req.params.newIndex], (err, results) => {
                if(err) return res.cc(err)
                if(results !== 0) {
                    const sql = 'update card_item set index_id = ? where pno = ? and index_id = 100'
                    db.query(sql,  [req.params.newIndex, req.params.pno], (err, results) => {
                        if(err) return res.cc(err)
                        res.send({
                            status: 200,
                            message: '交换成功'
                        })
                    })
                }
            })
        }
    })
}
exports.updateItemSort2 = (req, res) => {
    const sql = 'update card_item set index_id = 100 where pno = ? and index_id = ?'
    db.query(sql, [req.params.pno, req.params.oldIndex], (err, results) => {
        if(err) return res.cc(err)
        if(results !== 0) {
            const sql = 'update card_item set index_id = index_id + 1 where pno = ? and (index_id >= ? and index_id < ?)'
            db.query(sql, [req.params.pno, req.params.newIndex, req.params.oldIndex], (err, results) => {
                if(err) return res.cc(err)
                if(results !== 0) {
                    const sql = 'update card_item set index_id = ? where pno = ? and index_id = 100'
                    db.query(sql,  [req.params.newIndex, req.params.pno], (err, results) => {
                        if(err) return res.cc(err)
                        res.send({
                            status: 200,
                            message: '交换成功'
                        })
                    })
                }
            })
        }
    })
}
exports.updateItemSort3 = (req, res) => {
    console.log(req.params)
    const sql = 'update card_item set index_id = 100 where pno = ? and index_id = ?'
    db.query(sql, [req.params.oldId, req.params.oldIndex], (err,results) => {
        if(err) return res.cc(err)
        if(results !== 0) {
            const sql = 'update card_item set index_id = index_id -1 where pno = ? and (index_id > ?)'
            db.query(sql, [req.params.oldId, req.params.oldIndex], (err, results) => {
                if(err) return res.cc(err)
                const sql = 'update card_item set index_id = ?, pno = ? where pno = ? and index_id = 99'
                db.query(sql, [req.params.newIndex, req.params.newId, req.params.oldId], (err, results) => {
                    if(err) return res.cc(err)
                    res.send({
                        status: 200,
                        message: '跨列交换成功'
                    })
                })
            })
        }
    })
}
exports.updateItemSort4 = (req, res) => {
    const sql = 'update card_item set index_id = 100 where pno = ? and index_id = ?'
    db.query(sql, [req.params.oldId, req.params.oldIndex], (err,results) => {
        if(err) return res.cc(err)
        if(results !== 0) {
            const sql = 'update card_item set index_id = index_id -1 where pno = ? and (index_id > ?)'
            db.query(sql, [req.params.oldId, req.params.oldIndex], (err, results) => {
                if(err) return res.cc(err)
                const sql = 'update card_item set index_id = index_id +1 where pno = ? and (index_id >= ?)'
                db.query(sql, [req.params.newId, req.params.newIndex], (err, results) => {
                    if(err) return res.cc(err)
                    const sql = 'update card_item set index_id = ?, pno = ? where pno = ? and index_id = 99'
                    db.query(sql, [req.params.newIndex, req.params.newId, req.params.oldId], (err, results) => {
                        if(err) return res.cc(err)
                        res.send({
                            status: 200,
                            message: '跨列插中间交换成功'
                        })
                    })
                })
            })
        }
    })
}

exports.addPoolList = (req, res) => {
    const sql = 'select pname from pool where no = ? and pname = ?'
    db.query(sql, [req.body.no, req.body.pname], (err, results) => {
        if(err) return res.cc(err)
        if(results.length > 0) return res.cc('同项目中不可以重复列表项名称，请输入其他列表名称！')
        const sql = 'insert into pool set ?'
        db.query(sql, req.body, (err, results) => {
            if(err) return res.cc(err)
            if(results.affectedRows !== 1) return res.cc("添加列表出现异常，请重新操作！")
            res.send({
                status: 200,
                message: '列表创建成功！'
            })
        })
    })
}
exports.getPoolListMaxId = (req, res) => {
    const sql = 'select max(index_id) as maxid from pool where no = ?'
    db.query(sql, req.params.no, (err, results) => {
        if(err) return res.cc(err)
        res.send({
            status: 200,
            data: results
        })
    })
}

exports.editFinishState = (req, res) => {
    console.log(req.params)
    const sql = 'update card_item set is_finish = ? where c_item_id = ?'
    db.query(sql, [req.params.is_finish, req.params.c_item_id], (err, results) => {
        if(err) return res.cc(err)
        res.send({
            status: 200,
            message: '修改完成状态成功'
        })
    })
}
