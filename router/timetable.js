const express = require('express')
const TableHandle =  require('../router_handler/timetable')
const router = express.Router()
router.get('/tabletitle/:username', TableHandle.getTableTitle)
router.get('/course/:uid', TableHandle.getTableList)
router.get('/maxId', TableHandle.getMaxId)
router.post('/addcourseitem',TableHandle.addCourseItem)
router.post('/addtimetable', TableHandle.addTimeTable)
module.exports = router
