const express = require('express')
const DiaryHandler = require('../router_handler/diary')
const router = express.Router()
router.get('/:username', DiaryHandler.getDiaryData)
module.exports = router