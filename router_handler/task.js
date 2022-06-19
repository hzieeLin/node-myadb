const db = require('../database/index')
const express = require('express')
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
    const sql = 'select pname , no from task where username = ?'
    db.query(sql, req.params.username, (err, results) => {
        if(err) return res.cc(err)
        res.send({
            status: 200,
            data: results
        })
    })
}
exports.getAllProjectTitle = (req, res) => {
    const sql = 'select pname , no, iscol  from task where username = ?'
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
    console.log(req.params);
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
                            message: '同列表上换下交换成功'
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
    console.log(req.params)
    const sql = 'update card_item set index_id = 100, pno = ? where pno = ? and index_id = ?'
    db.query(sql, [req.params.newId, req.params.oldId, req.params.oldIndex], (err,results) => {
        if(err) return res.cc(err)
        if(results !== 0) {
            const sql = 'update card_item set index_id = index_id -1 where pno = ? and (index_id > ?)'
            db.query(sql, [req.params.oldId, req.params.oldIndex], (err, results) => {
                if(err) return res.cc(err)
                const sql = 'update card_item set index_id = index_id + 1 where pno = ? and (index_id >= ?)'
                db.query(sql, [req.params.newId, req.params.newIndex], (err, results) => {
                    if(err) return res.cc(err)
                    const sql = 'update card_item set index_id = ? where pno = ? and index_id = 101'
                    db.query(sql, [req.params.newIndex, req.params.newId], (err, results) => {
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

exports.updateItemSort5 = (req, res) => {
    console.log(req.params)
    const sql = 'update card_item set index_id = ?, pno = ? where pno = ? and index_id = ?'
    db.query(sql, [req.params.newIndex, req.params.newId, req.params.oldId, req.params.oldIndex], (err, results) => {
        if(err) return res.cc(err)
        if(results !== 0) {
            const sql = 'update card_item set index_id = index_id -1 where pno = ? and (index_id > ?)'
            db.query(sql, [req.params.oldId, req.params.oldIndex], (err, results) => {
                if(err) return res.cc(err)
                        res.send({
                            status: 200,
                            message: '跨列新列无任何卡片或是跨行尾插，交换成功！'
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

exports.getMaxNo = (req, res) => {
    console.log(req.params.username)
    const sql = 'select max(no) as maxno from task where username = ?'
    db.query(sql, req.params.username, (err, results) => {
        if(err) return res.cc(err)
        res.send({
            status: 200,
            data: results[0]
        })
    })
}

exports.addProject = (req, res) => {
    console.log(req.body)
//    先判定不能重复定义名称
    const sql = 'select pname from task where username = ? and pname = ?'
    db.query(sql, [req.body.username, req.body.pname], (err, results) => {
        if(err) return res.cc(err)
        if(results.length > 0) return res.cc('该名称已存在，请重新输入')
        const sql = 'insert into task set username = ?, no = ?, iscol = ?, pname = ?'
        db.query(sql, [req.body.username,  req.body.no,  req.body.iscol, req.body.pname], (err, results) => {
            if(err) return res.cc(err)
            if(results.affectedRows !== 1) return res.cc("添加列表出现异常，请重新操作！")
            const sql = `insert into tree set username = ?, content  = '新增了' ? '这个任务清单', time = ? `
            db.query(sql, [req.body.username, req.body.pname, req.body.date], (err, results) => {
                if(err) return res.cc(err)
                res.send({
                    status: 200,
                    message: '看板项目创建成功！'
                })
            })
        })
    })
}
exports.editCollection = (req, res) => {
    console.log(req.params)
    const sql = 'update task set iscol = ? where no = ?'
    db.query(sql, [req.params.iscol, req.params.no], (err, results) => {
        if(err) return res.cc(err)
        res.send({
            status: 200,
            message: '修改项目是否被收藏成功!'
        })
    })
}
exports.editProjectTitle = (req, res) => {
    console.log(req.params)
    const sql = 'select pname from task where pname = ? and no = ?'
    db.query(sql, [req.params.pname, req.params.no], (err, results) => {
        if(err) return res.cc(err)
        if(results.length > 0) return res.cc('该名称已存在，请重新输入!')
        const sql = 'update task set pname = ? where no = ?'
        db.query(sql,  [req.params.pname, req.params.no], (err, results) => {
            if(err) return res.cc(err)
            res.send({
                status: 200,
                message: '修改项目名称成功!'
            })
        })
    })
}

exports.deleteProject = (req, res) => {
    console.log(req.params)
    const sql = 'delete from task where username = ? and no = ?'
    db.query(sql, [req.params.username, req.params.no], (err, results) => {
        if(err) return res.cc(err)
        const sql ='delete from pool where no = ?'
        db.query(sql, req.params.no,(err, results) => {
          if(err) return res.cc(err)
            const sql = `insert into tree set username = ?, content  = '删除了' ? '这个任务清单', time = ? `
            db.query(sql, [req.params.username, req.params.pname, req.params.date], (err, results) => {
                if(err) return res.cc(err)
                res.send({
                    status: 200,
                    message: '删除项目成功！'
                })
            })
        })


    })
}

exports.getCardPno = (req, res) => {
    console.log(req.params)
    const sql = 'select pno from card_item where c_item_id = ?'
    db.query(sql, [req.params.id], (err, results) => {
        if(err) return res.cc(err)
        res.send({
            status: 200,
            data: results[0]
        })
    })
}

exports.delCardItem = (req, res) => {
    const sql = 'delete from card_item where pno = ? and index_id = ?'
    db.query(sql, [req.params.pno, req.params.index], (err, results) => {
        if(err) return res.cc(err)
        if(results.affectedRows === 0 ) return  res.cc(err)
        const sql = 'update card_item set index_id = index_id -1 where pno = ? and (index_id > ?)'
        db.query(sql, [req.params.pno, req.index], (err, results) => {
            if(err) return res.cc(err)
            res.send({
                status: 200,
                message: '删除卡片视图成功！'
            })
        })
    })
}
exports.delPoolItem = (req,res) => {
    console.log(req.params)
    const sql = 'select * from card_item where pno = ?'
    db.query(sql, req.params.pno, (err, results) => {
        if(err) return res.cc(err)
        if(results.length > 0) return res.cc('该列表中还存在卡片不可删除！')
        const sql = 'delete from pool where pno = ? and index_id = ?'
        db.query(sql, [req.params.pno, req.params.index], (err, results) => {
            if(err) return res.cc(err)
            if(results.affectedRows === 0 ) return  res.cc(err)
            const sql = 'update pool set index_id = index_id -1 where no = ? and (pno > ?)'
            db.query(sql, [req.params.no, req.index], (err, results) => {
                if(err) return res.cc(err)
                res.send({
                    status: 200,
                    message: '删除列表视图成功！'
                })
            })
        })
    })

}

exports.updatePool1 = (req, res) => {
    console.log(req.params);
    const sql = 'update pool set index_id = 100 where no = ? and index_id = ?'
    db.query(sql, [req.params.no, req.params.oldIndex], (err, results) => {
        if(err) return res.cc(err)
        if(results !== 0) {
            const sql = 'update pool set index_id = ? where no = ? and index_id = ?'
            db.query(sql, [req.params.oldIndex, req.params.no, req.params.newIndex], (err, results) => {
                if(err) return res.cc(err)
                if(results !== 0) {
                    const sql = 'update pool set index_id = ? where no = ? and index_id = 100'
                    db.query(sql,  [req.params.newIndex, req.params.no], (err, results) => {
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
exports.updatePool2 = (req, res) => {
    console.log(req.params)
    const sql = 'update pool set index_id = 100 where no = ? and index_id = ?'
    db.query(sql, [req.params.no, req.params.oldIndex], (err, results) => {
        if(err) return res.cc(err)
        if(results !== 0) {
            const sql = 'update pool set index_id = index_id + 1 where (no = ? and (index_id >= ? and index_id < ?))'
            db.query(sql, [req.params.no, req.params.newIndex, req.params.oldIndex], (err, results) => {
                if(err) return res.cc(err)
                if(results !== 0) {
                    const sql = 'update pool set index_id = ? where no = ? and index_id = 100'
                    db.query(sql,  [req.params.newIndex, req.params.no], (err, results) => {
                        if(err) return res.cc(err)
                        res.send({
                            status: 200,
                            message: '右换左交换成功'
                        })
                    })
                }
            })
        }
    })
}

exports.updatePool3 = (req, res) => {
    console.log(req.params)
    const sql = 'update pool set index_id = 100 where no = ? and index_id = ?'
    db.query(sql, [req.params.no, req.params.oldIndex], (err, results) => {
        if(err) return res.cc(err)
        if(results !== 0) {
            const sql = 'update pool set index_id = index_id - 1 where (no = ? and (index_id <= ? and index_id > ?))'
            db.query(sql, [req.params.no, req.params.newIndex, req.params.oldIndex], (err, results) => {
                if(err) return res.cc(err)
                if(results !== 0) {
                    const sql = 'update pool set index_id = ? where no = ? and index_id = 100'
                    db.query(sql,  [req.params.newIndex, req.params.no], (err, results) => {
                        if(err) return res.cc(err)
                        res.send({
                            status: 200,
                            message: '左换右交换成功'
                        })
                    })
                }
            })
        }
    })
}

