const express = require('express')
const TimeHandle =  require('../router_handler/time')
const router = express.Router()
router.post('/total1/:username/:s', TimeHandle.addTimes)
module.exports = router
